const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.put(
  "/:id",
  protect,
  updateQuantity
);

router.delete(
  "/:productId",
  protect,
  removeItem
);

router.delete(
  "/clear/all",
  protect,
  clearCart
);

module.exports = router;