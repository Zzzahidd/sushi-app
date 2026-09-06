const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("restaurant")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    )
      .populate("restaurant")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Status
exports.updateStatus = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};