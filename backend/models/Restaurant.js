const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    banner: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    deliveryTime: {
      type: String,
      default: "25 mins",
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    minimumOrder: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Restaurant",
  restaurantSchema
);