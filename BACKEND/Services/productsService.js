import products from "../Models/productsModel.js";

export const getProducts = async (user,query) => {
  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = limit * (page - 1);
  return await products.find({ user: user._id }).skip(skip).limit(limit);
};

export const getProduct = async (id, user) => {
  return await products.findOne({ _id: id, user: user._id });
};

export const createProduct = async (body, user) => {
  return await products.create({ ...body, user: user._id });
};

export const updatedProduct = async (id, body, user) => {
  return await products.findOneAndUpdate({ _id: id, user: user._id }, body, {
    returnDocument: "after",
  });
};
export const deleteProduct = async (id, user) => {
  return await products.findOneAndDelete({ _id: id, user: user._id });
};
