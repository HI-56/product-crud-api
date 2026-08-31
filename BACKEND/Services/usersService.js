import users from "../Models/usersModel.js";
import products from "../Models/productsModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcryptjs";
import { ApiError } from "../Utils/apiError.js";

export const getUsers = async (query) => {
  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = limit * (page - 1);
  return await users.find({ role: "user" }).skip(skip).limit(limit);
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
        role: body.role,
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
  await products.deleteMany({ user: id });
  return await users.findOneAndDelete({ _id: id });
};

export const getMe = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

export const updateLogedUserPswd = async (req, res, next) => {
  try {
    const user = await users.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          password: await bcrypt.hash(req.body.password, 12),
          pswdChangeAt: Date.now(),
        },
      },
      {
        returnDocument: "after",
      },
    );
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    res.status(200).json({ success: true, user, token });
  } catch (err) {
    next(new ApiError("password update failed", 500));
  }
};

export const updateLogedUser = async (req, res, next) => {
  try {
    const user = await users.findOneAndUpdate(
      { _id: req.user._id },
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
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Failed to update user",
        error: "no User found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "User updated successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to update User",
      error: "Internal server error",
    });
  }
};
export const deleteLogedUser = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
