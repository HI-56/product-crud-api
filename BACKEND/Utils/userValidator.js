import { check } from "express-validator";
import { Validator } from "../middlewares/validatorMiddleware.js";

export const userValidator = [
  check("name").notEmpty().withMessage("you should enter a valide name"),
  check("email").custom((value) => {
    if (!value.includes("@")) {
      throw new Error("invalid email");
    }
    return true;
  }),
  check("phone").optional().isMobilePhone("ar-MA").withMessage("you should enter a moroccan number"),
  Validator,
];
