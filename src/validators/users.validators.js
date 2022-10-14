import { body, query } from "express-validator";

/**
 * Schema para validar los queryparams del listado de usuarios
 * page -> int | min: 1
 * per_page -> int | min: 1
 */

const allSchema = [
  query("page").isInt({ min: 1 }),
  query("per_page").isInt({ min: 1 }),
];

const createSchema = [
  body("name").notEmpty().isLength({ min: 3, max: 10 }),
  body("last_name").notEmpty().isLength({ min: 3, max: 20 }),
  body("username").notEmpty().isLength({ min: 3, max: 15 }),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isLength({ min: 5, max: 16 }),
];

export { allSchema, createSchema };
