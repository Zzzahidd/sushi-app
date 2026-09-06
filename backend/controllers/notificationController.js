const Notification = require("../models/Notification");

// Get User Notifications
exports.getNotifications = async (
  req,
  res
) => {
  try {
    const notifications =
      await Notification.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Notification
exports.createNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.create({
          ...req.body,
          user: req.user._id,
        });

      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Mark Notification Read
exports.markAsRead = async (
  req,
  res
) => {
  try {
    const notification =
      await Notification.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found",
      });
    }

    res.json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notification
exports.deleteNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.findOneAndDelete(
          {
            _id: req.params.id,
            user: req.user._id,
          }
        );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found",
        });
      }

      res.json({
        success: true,
        message:
          "Notification deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Filter Notifications
exports.getNotificationsByType =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          user: req.user._id,
          type: req.params.type,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        count: notifications.length,
        notifications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };