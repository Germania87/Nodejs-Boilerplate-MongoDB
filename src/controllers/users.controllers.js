import users from "../models/users";
import { paginationFields, paginationResults } from "../helpers/pagination";

class UserController {
  constructor() {
    this.model = users;
  }

  async all(request, response) {
    try {
      /**
       * Paginación
       * QueryParams: page, per_page
       * - Sequelize
       * count -> cantidad de filas
       * rows -> filas solicitados
       */
      const { page, per_page } = request.query;
      const { limit, offset } = paginationFields(page, per_page);
      const documents = await this.model
        .find()
        .select("-password")
        .limit(limit)
        .skip(offset);
      const count = await this.model.countDocuments();
      return response
        .status(200)
        .json(paginationResults({ rows: documents, count }, page, per_page));
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async createDocument(request, response) {
    try {
      const { name, last_name, username, email, password } = request.body;
      const document = this.model({
        name,
        last_name,
        username,
        email,
        password,
      });
      await document.hashPassword();
      await document.save();
      return response.status(201).json(document);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async getById(request, response) {
    try {
      const { username } = request.params;

      const document = await this.model.findOne({
        username,
      });
      return response.status(200).json(document);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async updateDocument(request, response) {
    try {
      const { username } = request.params;
      const { body } = request;

      await this.model.findOneAndUpdate({ username }, { ...body });

      return response.status(200).json({
        message: `User Update, Search -> ${username}`,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteDocument(request, response) {
    try {
      const { username } = request.params;

      await this.model.findOneAndUpdate({ username }, { status: false });

      return response.status(200).json({
        message: `User Delete, Search -> ${username}`,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
}

export default UserController;
