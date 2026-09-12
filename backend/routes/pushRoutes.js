const express = require("express");

const router = express.Router();

const {
  registerToken,
  sendPush,
  sendOrderPush,
  sendPromoPush,
} = require("../controllers/pushController");

router.post("/register-token", registerToken);
router.post("/send", sendPush);
router.post("/send-order-update", sendOrderPush);
router.post("/send-promo", sendPromoPush);

// Default post alias
router.post("/", sendPush);

module.exports = router;