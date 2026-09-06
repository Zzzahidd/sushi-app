const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  updateAvatar,
} = require("../controllers/profileController");

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

router.put(
  "/avatar",
  protect,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;