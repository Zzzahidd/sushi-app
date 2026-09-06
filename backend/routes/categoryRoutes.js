const express = require("express");
const router = express.Router();
const { getCategoryProducts } = require("../controllers/productController");

router.get("/:category", getCategoryProducts);

module.exports = router;
