const Review = require("../models/Review");

// Add Review
exports.addReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Restaurant Reviews
exports.getRestaurantReviews = async (
  req,
  res
) => {
  try {
    const reviews = await Review.find({
      restaurant: req.params.restaurantId,
    }).populate("user", "name");

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Review
exports.updateReview = async (
  req,
  res
) => {
  try {
    const review =
      await Review.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Review
exports.deleteReview = async (
  req,
  res
) => {
  try {
    await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};