import users from "../Models/usersModel.js";
import bcrypt, { hash } from "bcryptjs";

export const getUsers = async (query) => {
  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = limit * (page - 1);
  return await users.find({}).skip(skip).limit(limit);
};

export const getUser = async (id) => {
  return await users.findById(id);
};

export const createUser = async (body) => {
  return await users.create(body);
};

export const updatedUser = async (id, body) => {
  return await users.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

export const updatedPswd = async (id, body) => {
  return await users.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        password: await bcrypt.hash(body.password, 12),
        pswdChangeAt: Date.now(),
      },
    },
    {
      returnDocument: "after",
    },
  );
};
export const deleteUser = async (id) => {
  return await users.findOneAndDelete({ _id: id });
};

export const getMe = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
