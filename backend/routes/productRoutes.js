const express = require("express");

const router = express.Router();

const {
  getProducts,
  getRestaurantProducts,
  getCategoryProducts,
  getProduct,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get(
  "/restaurant/:restaurantId",
  getRestaurantProducts
);

router.get(
  "/category/:category",
  getCategoryProducts
);

router.get("/:id", getProduct);

module.exports = router;