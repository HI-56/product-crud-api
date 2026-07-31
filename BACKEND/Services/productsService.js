import products from "../Models/productsModel.js";

export const getProducts = async () => {
  return await products.find({});
};

export const getProduct = async (id) => {
  return await products.findById(id);
};

export const createProduct = async (body) => {
  return await products.create(body);
};

export const updatedProduct = async (id, body) => {
  return await products.findOneAndUpdate({ _id: id }, body, {
    returnDocument: "after",
  });
};
export const deleteProduct = async (id) => {
  return await products.findOneAndDelete({_id: id});
};