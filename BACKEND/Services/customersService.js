import Customers from "../Models/customersModel.js";

export const getCustomers = async (user, query) => {
  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = limit * (page - 1);
  const search = query.search;
  // const category = query.category?.trim();
  // const status = query.status;
  const findCondition = { user: user._id };
  if (search) {
    findCondition.name = {
      $regex: search,
      $options: "i",
    };
  }
  // if (category) {
  //   findCondition.category = {
  //     $regex: `^${category}$`,
  //     $options: "i",
  //   };
  // }

  // if (status) {
  //   findCondition.status = {
  //     $regex: `^${status}$`,
  //     $options: "i",
  //   };
  // }
  return await Customers.find(findCondition).skip(skip).limit(limit);
};
export const filtration = async (user, query) => {
  return await Customers.find({ user: user._id }).skip(skip).limit(limit);
};
export const getCustomer = async (id, user) => {
  return await Customers.findOne({ _id: id, user: user._id });
};

export const createCustomer = async (body, user) => {
  return await Customers.create({ ...body, user: user._id });
};

export const updatedCustomer = async (id, body, user) => {
  return await Customers.findOneAndUpdate({ _id: id, user: user._id }, body, {
    returnDocument: "after",
  });
};
export const deleteCustomer = async (id, user) => {
  return await Customers.findOneAndDelete({ _id: id, user: user._id });
};
