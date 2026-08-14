import {
  getProducts,
  getProduct,
  createProduct,
  updatedProduct,
  deleteProduct,
} from "../Services/productsService.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();
    return res.status(200).json({
      success: true,
      msg: "Products retrieved successfully",
      data: products,
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
    const product = await getProduct(req.params.id);
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
    const newProduct = await createProduct(req.body);
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
    const updated = await updatedProduct(req.params.id, req.body);
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
    const deleted = await deleteProduct(req.params.id);
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
