import { Router } from "express";
import RoleController from "../controllers/roles.controllers";
import validation from "../middlewares/validation";
import {
  allSchema,
  createSchema,
  getByFieldSchema,
  updateSchema,
  deleteSchema,
} from "../validators/roles.validators";
import authentication from "../middlewares/authentication";

const router = Router();
const controller = new RoleController();

router.use(authentication);
router.get("/", validation(allSchema), (request, response) =>
  controller.all(request, response)
);
router.post("/", validation(createSchema), (request, response) =>
  controller.createDocument(request, response)
);
router.get("/:code", validation(getByFieldSchema), (request, response) =>
  controller.getByField(request, response)
);
router.put("/:code", validation(updateSchema), (request, response) =>
  controller.updateDocument(request, response)
);
router.delete("/:code", validation(deleteSchema), (request, response) =>
  controller.deleteDocument(request, response)
);

export default router;
