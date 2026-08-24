import {
  getProducts,
  getProduct,
  createProduct,
  updatedProduct,
  deleteProduct,
} from "../Services/productsService.js";
import products from "../Models/productsModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const productsList = await getProducts(req.user, req.query);
    const totalProducts = await products.countDocuments({
      user: req.user._id,
    });
    const LowStockProducts = await products.countDocuments({
      user: req.user._id,
      status: "low stock",
    });
    const OutOfStockProducts = await products.countDocuments({
      user: req.user._id,
      status: "out of stock",
    });
    return res.status(200).json({
      success: true,
      page: req.query.page,
      msg: "Products retrieved successfully",
      data: productsList,
      totalProducts,
      LowStockProducts,
      OutOfStockProducts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to retrieve products",
      error: "Internal server error",
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await getProduct(req.params.id, req.user);
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Failed to retrieve product",
        error: "no product found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Product retrieved successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to retrieve product",
      error: "Internal server error",
    });
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body, req.user);
    return res.status(201).json({
      success: true,
      msg: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to create new product",
      error: "Internal server error",
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const updated = await updatedProduct(req.params.id, req.body, req.user);
    if (!updated) {
      return res.status(404).json({
        success: false,
        msg: "Failed to retrieve product",
        error: "no product found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Product updated successfully",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to update product",
      error: "Internal server error",
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id, req.user);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        msg: "Failed to delete product",
        error: "no product found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Product deleted successfully",
      data: deleted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to delete product",
      error: "Internal server error",
    });
  }
};
