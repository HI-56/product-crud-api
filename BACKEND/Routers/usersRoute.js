import express from "express";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} from "../Controllers/usersController.js";
import { userValidator } from "../Utils/userValidator.js";
const router = express.Router();

router.route("/").get( getAllUsers).post(userValidator,createNewUser);
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export default router;
