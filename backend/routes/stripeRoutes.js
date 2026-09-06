const express = require("express");

const router = express.Router();

const {
  createPaymentIntent,
} = require("../controllers/stripeController");

router.post(
  "/payment-intent",
  createPaymentIntent
);

module.exports = router;