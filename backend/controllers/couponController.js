const Coupon = require("../models/Coupon");

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
      isActive: true,
    });

    res.json({
      success: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid Coupon",
      });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon Expired",
      });
    }

    if (amount < coupon.minimumOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order is ${coupon.minimumOrder}`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount =
        (amount * coupon.discountValue) / 100;

      if (
        coupon.maximumDiscount &&
        discount > coupon.maximumDiscount
      ) {
        discount = coupon.maximumDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      coupon,
      discount,
      finalAmount: amount - discount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};