const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  sendMessage,
  getMessages,
  markRead,
} = require("../controllers/chatController");

router.post("/", protect, sendMessage);

router.get(
  "/:orderId",
  protect,
  getMessages
);

router.put(
  "/:orderId/read",
  protect,
  markRead
);

module.exports = router;