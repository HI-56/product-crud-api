import { body, check } from "express-validator";
import { Validator } from "../middlewares/validatorMiddleware.js";

export const userCreateValidator = [
  check("name").notEmpty().withMessage("you should enter a valide name"),
  check("email").custom((value) => {
    if (!value.includes("@")) {
      throw new Error("invalid email");
    }
    return true;
  }),
  check("phone")
    .optional()
    .isMobilePhone("ar-MA")
    .withMessage("you should enter a moroccan number"),
  body("confirmePswd")
    .notEmpty()
    .withMessage("the confirme password is empty")
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("enter password correctly ");
      }
      return true;
    }),
  Validator,
];
export const userUpdateValidator = [
  check("name").notEmpty().withMessage("you should enter a valide name"),
  check("email").custom((value) => {
    if (!value.includes("@")) {
      throw new Error("invalid email");
    }
    return true;
  }),
  check("phone")
    .optional()
    .isMobilePhone("ar-MA")
    .withMessage("you should enter a moroccan number"),

  Validator,
];

export const passwordUpdateValidator = [
  check("password").notEmpty().withMessage("enter password"),
  body("confirmePswd")
    .notEmpty()
    .withMessage("the confirme password is empty")
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("enter password correctly ");
      }
      return true;
    }),
  Validator,
];
