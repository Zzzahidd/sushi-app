const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  getNotificationsByType,
} = require("../controllers/notificationController");

router.get(
  "/",
  protect,
  getNotifications
);

router.get(
  "/type/:type",
  protect,
  getNotificationsByType
);

router.post(
  "/",
  protect,
  createNotification
);

router.put(
  "/:id/read",
  protect,
  markAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

module.exports = router;