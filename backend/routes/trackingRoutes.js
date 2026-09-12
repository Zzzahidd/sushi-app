const express = require("express");

const router = express.Router();

const {
  updateTracking,
  simulateTrip,
  getLiveTracking,
} = require("../controllers/trackingController");

router.get("/:id", getLiveTracking);
router.put("/:id", updateTracking);
router.post("/:id/simulate", simulateTrip);

module.exports = router;