const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  dashboard,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  dashboard
);

module.exports = router;