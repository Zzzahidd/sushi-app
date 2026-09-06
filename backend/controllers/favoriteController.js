const Favorite = require("../models/Favorite");

// Get all favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
    })
      .populate("restaurant")
      .populate("product");

    res.json({
      success: true,
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add favorite
exports.addFavorite = async (req, res) => {
  try {
    const { restaurant, product } = req.body;

    const exists = await Favorite.findOne({
      user: req.user._id,
      restaurant,
      product,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already in favorites",
      });
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      restaurant,
      product,
    });

    res.status(201).json({
      success: true,
      favorite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove favorite
exports.removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.json({
      success: true,
      message: "Removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};