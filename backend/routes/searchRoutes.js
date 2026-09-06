const express = require("express");

const router = express.Router();

const {
  search,
  searchRestaurants,
  searchProducts,
} = require("../controllers/searchController");

router.get("/", search);

router.get(
  "/restaurants",
  searchRestaurants
);

router.get(
  "/products",
  searchProducts
);

module.exports = router;