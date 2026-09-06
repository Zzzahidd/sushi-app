const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    items: [orderItemSchema],

    deliveryAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      zipCode: String,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Wallet"],
      default: "Card",
    },

    subtotal: Number,

    deliveryFee: {
      type: Number,
      default: 5,
    },

    tax: Number,

    total: Number,

    status: {
      type: String,
      enum: [
        "Preparing",
        "Picked Up",
        "On The Way",
        "Delivered",
        "Cancelled",
      ],
      default: "Preparing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);