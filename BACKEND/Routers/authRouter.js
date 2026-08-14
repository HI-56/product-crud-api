import express from "express";
import { signup, login } from "../Services/authService.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
//router.route("/changePswd/:id").patch(passwordUpdateValidator, updatePswdById);
//router
//  .route("/:id")
//  .get(getUserById)
//  .patch(userUpdateValidator,updateUserById)
//  .delete(deleteUserById);

export default router;
