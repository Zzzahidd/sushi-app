const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
    analytics,
} = require("../controllers/analyticsController");

router.get(
    "/",
    protect,
    admin,
    analytics
);

module.exports = router;