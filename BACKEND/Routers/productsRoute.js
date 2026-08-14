import express from "express";
import {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
} from "../Controllers/productsController.js";
import { productValidator } from "../Utils/productValidator.js";
import { protect } from "../Services/authService.js";
const router = express.Router();

router
  .route("/")
  .get(protect, getAllProducts)
  .post(protect, productValidator, createNewProduct);
router
  .route("/:id")
  .get(protect, getProductById)
  .patch(protect, updateProductById)
  .delete(protect, deleteProductById);

export default router;
