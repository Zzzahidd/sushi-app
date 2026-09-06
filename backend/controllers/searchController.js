const Restaurant = require("../models/Restaurant");
const Product = require("../models/Product");

// Global Search
exports.search = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const restaurants = await Restaurant.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    const products = await Product.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    }).populate("restaurant", "name");

    res.json({
      success: true,
      restaurants,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Restaurants Only
exports.searchRestaurants = async (
  req,
  res
) => {
  try {
    const restaurants = await Restaurant.find({
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    });

    res.json({
      success: true,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Products Only
exports.searchProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }).populate("restaurant", "name");

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};