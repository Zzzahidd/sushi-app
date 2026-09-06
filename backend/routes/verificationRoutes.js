const express = require("express");

const router = express.Router();

const {
    verifyEmail,
} = require("../controllers/verificationController");

router.put(
    "/:id",
    verifyEmail
);

module.exports = router;