const Restaurant = require("../models/Restaurant");

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get featured restaurants
exports.getFeaturedRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      featured: true,
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

// Get popular restaurants
exports.getPopularRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      popular: true,
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

// Get restaurant by ID
exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};