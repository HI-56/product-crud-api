import express from "express";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  updatePswdById,
  deleteUserById,
  uploadAvatar,
} from "../Controllers/usersController.js";
import {
  userCreateValidator,
  userUpdateValidator,
  passwordUpdateValidator,
} from "../Utils/userValidator.js";
import { protect, allowedTo } from "../Services/authService.js";
import {
  getMe,
  updateLogedUserPswd,
  updateLogedUser,
  deleteLogedUser,
} from "../Services/usersService.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(protect);

// routes for each user to manage his owen account
router
  .route("/me")
  .get(allowedTo("admin", "user"), getMe, getUserById)
  .patch(
    allowedTo("admin", "user"),
    userUpdateValidator,
    updateLogedUser,
    updateUserById,
  )
  .delete(allowedTo("admin", "user"), deleteLogedUser, deleteUserById);
router.post("/upload", upload.single("avatar"), uploadAvatar);

router
  .route("/updatePswd")
  .patch(
    allowedTo("admin", "user"),
    passwordUpdateValidator,
    updateLogedUserPswd,
  );

// routes for manage all users (only admin)
router.use(protect, allowedTo("admin"));
router.route("/").get(getAllUsers).post(userCreateValidator, createNewUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(userUpdateValidator, updateUserById)
  .delete(deleteUserById);

router.route("/changePswd/:id").patch(passwordUpdateValidator, updatePswdById);

export default router;
