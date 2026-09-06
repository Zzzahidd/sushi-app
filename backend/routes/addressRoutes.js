const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController");

router.get("/", protect, getAddresses);

router.post("/", protect, addAddress);

router.put("/:id", protect, updateAddress);

router.delete("/:id", protect, deleteAddress);

router.put(
  "/default/:id",
  protect,
  setDefaultAddress
);

module.exports = router;