const express = require("express");

const router = express.Router();

const {
  getRestaurants,
  getRestaurant,
  getFeaturedRestaurants,
  getPopularRestaurants,
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);

router.get("/featured", getFeaturedRestaurants);

router.get("/popular", getPopularRestaurants);

router.get("/:id", getRestaurant);

module.exports = router;