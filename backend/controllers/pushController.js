const {
  sendNotification,
  sendExpoPushNotification,
  sendOrderStatusPush,
  sendPromoPush,
} = require("../services/notificationService");
const User = require("../models/User");

// Active registered tokens store (in-memory cache for fast broadcast)
const activeDeviceTokens = new Set();

// Register device push token
exports.registerToken = async (req, res) => {
  try {
    const { token, fcmToken, userId } = req.body;

    if (!token && !fcmToken) {
      return res.status(400).json({
        success: false,
        message: "Push token is required",
      });
    }

    const resolvedToken = token || fcmToken;
    activeDeviceTokens.add(resolvedToken);

    // If user is authenticated or userId is passed, persist to MongoDB
    const targetUserId = req.user ? req.user._id : userId;
    if (targetUserId) {
      try {
        await User.findByIdAndUpdate(targetUserId, {
          pushToken: resolvedToken,
          ...(fcmToken ? { fcmToken } : {}),
        });
      } catch (_) {}
    }

    res.json({
      success: true,
      message: "Push token registered successfully",
      registeredCount: activeDeviceTokens.size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send single push notification
exports.sendPush = async (req, res) => {
  try {
    const { token, title, body, data } = req.body;

    const result = await sendNotification(
      token,
      title || "Sushir Bhai Alert",
      body || "You have a new update!",
      data || {}
    );

    res.json({
      success: true,
      message: "Notification dispatched",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send Order Lifecycle Push Update
exports.sendOrderPush = async (req, res) => {
  try {
    const { token, orderId, status } = req.body;

    const result = await sendOrderStatusPush(
      token,
      orderId || "SB-8924",
      status || "on_the_way"
    );

    res.json({
      success: true,
      message: `Order push sent for ${status}`,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send Promo Push Broadcast
exports.sendPromoPush = async (req, res) => {
  try {
    const { title, body, promoCode, tokens } = req.body;

    // Use passed tokens or all registered device tokens
    const targetTokens = Array.isArray(tokens) && tokens.length > 0
      ? tokens
      : Array.from(activeDeviceTokens);

    const result = await sendPromoPush(
      targetTokens.length > 0 ? targetTokens : ["ExponentPushToken[demo-token-sushi]"],
      title || "🍣 Hungry? 30% OFF Today!",
      body || "Use code SUSHI30 on all Dragon Rolls & Salmon Platters. Tap to order!",
      promoCode || "SUSHI30"
    );

    res.json({
      success: true,
      message: "Promotional push broadcast dispatched",
      audienceSize: targetTokens.length,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};