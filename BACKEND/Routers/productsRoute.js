import express from "express";
import {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
} from "../Controllers/productsController.js";
import { productValidator } from "../Utils/productValidator.js";
import { protect, allowedTo } from "../Services/authService.js";
const router = express.Router();

router
  .route("/")
  .get(protect, allowedTo("user", "admin"), getAllProducts)
  .post(
    protect,
    allowedTo("user", "admin"),
    productValidator,
    createNewProduct,
  );
router
  .route("/:id")
  .get(protect,allowedTo("user", "admin"), getProductById)
  .patch(protect, allowedTo("user", "admin"),updateProductById)
  .delete(protect, allowedTo("user", "admin"),deleteProductById);

export default router;
