import { check } from "express-validator";
import { Validator } from "../middlewares/validatorMiddleware.js";

export const customerValidator = [
  check("name").notEmpty().withMessage("you should enter a valide name"),
  Validator,
];
