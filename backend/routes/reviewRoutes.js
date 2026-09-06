const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  addReview,
  getRestaurantReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", protect, addReview);

router.get(
  "/:restaurantId",
  getRestaurantReviews
);

router.put("/:id", protect, updateReview);

router.delete(
  "/:id",
  protect,
  deleteReview
);

module.exports = router;