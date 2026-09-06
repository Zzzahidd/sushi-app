const express = require("express");

const router = express.Router();

const {
  sendPush,
} = require("../controllers/pushController");

router.post("/", sendPush);

module.exports = router;