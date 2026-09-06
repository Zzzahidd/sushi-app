const Payment = require("../models/Payment");

// Create Payment
exports.createPayment = async (
  req,
  res
) => {
  try {
    const payment =
      await Payment.create({
        ...req.body,
        user: req.user._id,
      });

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Payments
exports.getPayments = async (
  req,
  res
) => {
  try {
    const payments =
      await Payment.find({
        user: req.user._id,
      })
        .populate("order")
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Payment
exports.getPayment = async (
  req,
  res
) => {
  try {
    const payment =
      await Payment.findById(
        req.params.id
      ).populate("order");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message:
          "Payment not found",
      });
    }

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Payment Status
exports.updatePaymentStatus =
  async (req, res) => {
    try {
      const payment =
        await Payment.findByIdAndUpdate(
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
        payment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };