import {
  getCustomers,
  getCustomer,
  createCustomer,
  updatedCustomer,
  deleteCustomer,
} from "../Services/customersService.js";
import Customers from "../Models/customersModel.js";

export const getAllCustomers = async (req, res) => {
  try {
    const CustomersList = await getCustomers(req.user, req.query);
    const totalCustomers = await Customers.countDocuments({
      user: req.user._id,
    });
    
    return res.status(200).json({
      success: true,
      page: req.query.page,
      msg: "Customers retrieved successfully",
      data: CustomersList,
      totalCustomers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to retrieve Customers",
      error: "Internal server error",
    });
  }
};
export const getCustomerById = async (req, res) => {
  try {
    const Customer = await getCustomer(req.params.id, req.user);
    if (!Customer) {
      return res.status(404).json({
        success: false,
        msg: "Failed to retrieve Customer",
        error: "no Customer found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Customer retrieved successfully",
      data: Customer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to retrieve Customer",
      error: "Internal server error",
    });
  }
};

export const createNewCustomer = async (req, res) => {
  try {
    const newCustomer = await createCustomer(req.body, req.user);
    return res.status(201).json({
      success: true,
      msg: "Customer created successfully",
      data: newCustomer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to create new Customer",
      error: "Internal server error",
    });
  }
};

export const updateCustomerById = async (req, res) => {
  try {
    const updated = await updatedCustomer(req.params.id, req.body, req.user);
    if (!updated) {
      return res.status(404).json({
        success: false,
        msg: "Failed to retrieve Customer",
        error: "no Customer found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Customer updated successfully",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to update Customer",
      error: "Internal server error",
    });
  }
};

export const deleteCustomerById = async (req, res) => {
  try {
    const deleted = await deleteCustomer(req.params.id, req.user);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        msg: "Failed to delete Customer",
        error: "no Customer found match the ID",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Customer deleted successfully",
      data: deleted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to delete Customer",
      error: "Internal server error",
    });
  }
};
