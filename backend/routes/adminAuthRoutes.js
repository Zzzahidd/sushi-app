const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
    getUsers,
    updateUserRole,
} = require("../controllers/adminAuthController");

router.get(
    "/users",
    protect,
    admin,
    getUsers
);

router.put(
    "/users/:id/role",
    protect,
    admin,
    updateUserRole
);

module.exports = router;