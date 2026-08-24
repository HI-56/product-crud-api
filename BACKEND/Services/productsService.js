import products from "../Models/productsModel.js";

export const getProducts = async (user, query) => {
  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = limit * (page - 1);
  const search = query.search;
  const category = query.category?.trim();
  const status = query.status;
  const findCondition = { user: user._id };
  if (search) {
    findCondition.name = {
      $regex: search,
      $options: "i",
    };
  }
  if (category) {
    findCondition.category = {
      $regex: `^${category}$`,
      $options: "i",
    };
  }

  if (status) {
    findCondition.status = {
      $regex: `^${status}$`,
      $options: "i",
    };
  }
  return await products.find(findCondition).skip(skip).limit(limit);
};
export const filtration = async (user, query) => {
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
