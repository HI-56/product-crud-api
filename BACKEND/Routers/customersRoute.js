import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  createNewCustomer,
  updateCustomerById,
  deleteCustomerById,
} from "../Controllers/customersController.js";
import { customerValidator } from "../Utils/customerValidator.js";
import { protect, allowedTo } from "../Services/authService.js";
const router = express.Router();

router
  .route("/")
  .get(protect, allowedTo("user", "admin"), getAllCustomers)
  .post(
    protect,
    allowedTo("user", "admin"),
    customerValidator,
    createNewCustomer,
  );
router
  .route("/:id")
  .get(protect, allowedTo("user", "admin"), getCustomerById)
  .patch(protect, allowedTo("user", "admin"), updateCustomerById)
  .delete(protect, allowedTo("user", "admin"), deleteCustomerById);

export default router;
