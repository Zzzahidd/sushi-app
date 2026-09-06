const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  updateTracking,
} = require("../controllers/trackingController");

router.put(
  "/:id",
  protect,
  updateTracking
);

module.exports = router;