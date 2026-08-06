import users from "../Models/usersModel.js";

export const getUsers = async () => {
  return await users.find({});
};

export const getUser  = async (id) => {
  return await users.findById(id);
};

export const createUser = async (body) => {
  return await users.create(body);
};

export const updatedUser  = async (id, body) => {
  return await users.findOneAndUpdate({ _id: id }, body, {
    returnDocument: "after",
  });
};
export const deleteUser  = async (id) => {
  return await users.findOneAndDelete({_id: id});
};