import users from "../models/users";

class UserController {
  constructor() {
    this.model = users;
  }

  async all(request, response) {
    try {
      const documents = await this.model
        .find({
          status: true,
        })
        .select("-password");
      return response.status(200).json(documents);
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
