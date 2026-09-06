const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "restaurant",
      "name image"
    );

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get products by restaurant
exports.getRestaurantProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      restaurant: req.params.restaurantId,
    });

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

// Get products by category
exports.getCategoryProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

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

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};