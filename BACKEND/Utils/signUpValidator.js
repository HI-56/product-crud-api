import { body, check } from "express-validator";
import { Validator } from "../middlewares/validatorMiddleware.js";
import users from "../Models/usersModel.js";

export const signUpValidation = [
  check("name").notEmpty().withMessage("you should enter a valide name"),
  check("email").custom(async (value, { req }) => {
    if (!value.includes("@")) {
      throw new Error("invalid email");
    }
    if (await users.findOne({ email: req.body.email })) {
      throw new Error("this email is used by another user");
    }
    return true;
  }),
  Validator,
];
