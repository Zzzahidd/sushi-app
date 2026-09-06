const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  createPayment,
  getPayments,
  getPayment,
  updatePaymentStatus,
} = require("../controllers/paymentController");

router.post(
  "/",
  protect,
  createPayment
);

router.get(
  "/",
  protect,
  getPayments
);

router.get(
  "/:id",
  protect,
  getPayment
);

router.put(
  "/:id/status",
  protect,
  updatePaymentStatus
);

module.exports = router;