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
  passwordUpdateValidator,
} from "../Utils/userValidator.js";
import { protect, allowedTo } from "../Services/authService.js";
import { getMe } from "../Services/usersService.js";

const router = express.Router();
router.use(protect, allowedTo("admin", "user"));
router.route("/").get(getAllUsers).post(userCreateValidator, createNewUser);
router.route("/me").get(protect, getMe, getUserById);
router.route("/changePswd/:id").patch(passwordUpdateValidator, updatePswdById);
router
  .route("/:id")
  .get(getUserById)
  .patch(userUpdateValidator, updateUserById)
  .delete(deleteUserById);

export default router;
