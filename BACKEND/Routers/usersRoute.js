import express from "express";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  updatePswdById,
  deleteUserById,
} from "../Controllers/usersController.js";
import {
  userCreateValidator,
  userUpdateValidator,
  passwordUpdateValidator
} from "../Utils/userValidator.js";
const router = express.Router();

router.route("/").get(getAllUsers).post(userCreateValidator, createNewUser);
router.route("/changePswd/:id").patch(passwordUpdateValidator, updatePswdById);
router
  .route("/:id")
  .get(getUserById)
  .patch(userUpdateValidator,updateUserById)
  .delete(deleteUserById);

export default router;
