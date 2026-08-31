import fs from "fs/promises";
import {
  getUsers,
  getUser,
  createUser,
  updatedUser,
  deleteUser,
  updatedPswd,
} from "../Services/usersService.js";
import users from "../Models/usersModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers(req.query);
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Failed to retrieve user",
        error: "no user found ",
      });
    }
    return res.status(200).json({
      success: true,
      results: users.length,
      page: req.query.page,
      msg: "users retrieved successfully",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to retrieve users",
      error: "Internal server error",
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await getUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Failed to retrieve user",
        error: "no user found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "user retrieved successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to retrieve user",
      error: "Internal server error",
    });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    return res.status(201).json({
      success: true,
      msg: "user created successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to create new user",

      error: "Internal server error",
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const updated = await updatedUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        msg: "Failed to update product",
        error: "no User found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "User updated successfully",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to update User",
      error: "Internal server error",
    });
  }
};

export const updatePswdById = async (req, res) => {
  try {
    const updated = await updatedPswd(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        msg: "Failed to update Password",
        error: "no User found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Password updated successfully",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to update Password",
      error: "Internal server error",
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        msg: "Failed to retrieve product",
        error: "no User found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "User deleted successfully",
      data: deleted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to delete User",
      error: "Internal server error",
    });
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const user = await users.findById(req.user._id);
    const oldAvatar = user.avatar;
    user.avatar = req.file.path;
    await user.save();
    if (oldAvatar) {
      await fs.unlink(oldAvatar);
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
