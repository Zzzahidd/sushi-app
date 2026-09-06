const Order = require("../models/Order");
const { getIO } = require("../socket/socket");

exports.updateTracking = async (req, res) => {
  try {
    const { status, latitude, longitude } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    getIO().to(req.params.id).emit("tracking", {
      orderId: req.params.id,
      status,
      location: {
        latitude,
        longitude,
      },
    });

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