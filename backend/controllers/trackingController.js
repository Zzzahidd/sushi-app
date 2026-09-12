const Order = require("../models/Order");
const { getIO, broadcastDriverLocation, broadcastOrderStatus, startSimulatedDriverTrip, stopSimulatedDriverTrip } = require("../socket/socket");

// Update driver tracking location / status
exports.updateTracking = async (req, res) => {
  try {
    const { status, latitude, longitude, heading = 0, speed = 0, etaMinutes = 10, courierName } = req.body;
    const orderId = req.params.id;

    let order = null;
    try {
      order = await Order.findByIdAndUpdate(
        orderId,
        {
          ...(status ? { status } : {}),
        },
        {
          new: true,
        }
      );
    } catch (_) {
      // Order may be a demo string ID like SB-8924
    }

    const payload = {
      orderId,
      status: status || (order ? order.status : "on_the_way"),
      latitude,
      longitude,
      heading,
      speed,
      etaMinutes,
      courierName: courierName || "Alexei Volkov",
    };

    broadcastDriverLocation(orderId, payload);
    if (status) {
      broadcastOrderStatus(orderId, { status, step: status === "delivered" ? 4 : 3 });
    }

    res.json({
      success: true,
      message: "Driver tracking updated successfully",
      tracking: payload,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Trigger simulated driver trip for testing & demo
exports.simulateTrip = async (req, res) => {
  try {
    const orderId = req.params.id || "SB-8924";
    const { action = "start" } = req.body;

    if (action === "stop") {
      stopSimulatedDriverTrip(orderId);
      return res.json({
        success: true,
        message: `Simulated trip stopped for order ${orderId}`,
      });
    }

    startSimulatedDriverTrip(orderId);
    res.json({
      success: true,
      message: `Simulated GPS driver trip started for order ${orderId}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current live tracking details for an order
exports.getLiveTracking = async (req, res) => {
  try {
    const orderId = req.params.id;
    let order = null;
    try {
      order = await Order.findById(orderId);
    } catch (_) {}

    res.json({
      success: true,
      tracking: {
        orderId,
        status: order ? order.status : "on_the_way",
        courier: {
          name: "Alexei Volkov",
          phone: "+1 (555) 349-2810",
          rating: 4.9,
          totalDeliveries: 1840,
          vehicle: "E-Scooter Pro Max",
        },
        etaMinutes: 14,
        currentLocation: {
          latitude: 35.6895,
          longitude: 139.6917,
        },
      },
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};