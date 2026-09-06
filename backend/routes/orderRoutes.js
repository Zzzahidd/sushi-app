const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  createOrder,
  getOrders,
  getOrder,
  updateStatus,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);

router.get("/", protect, getOrders);

router.get("/:id", protect, getOrder);

router.put(
  "/:id/status",
  protect,
  updateStatus
);

module.exports = router;