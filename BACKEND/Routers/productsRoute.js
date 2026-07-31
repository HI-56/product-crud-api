import express from "express";
import {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
} from "../Controllers/productsController.js";
import { productValidator } from "../Utils/productValidator.js";
const router = express.Router();

router.route("/").get( getAllProducts).post(productValidator,createNewProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(updateProductById)
  .delete(deleteProductById);

export default router;
