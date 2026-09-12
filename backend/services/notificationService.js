const admin = require("../config/firebase");
const logger = require("../config/logger");

/**
 * Universal Push Notification Service
 * Supports Expo Push Tokens (ExponentPushToken[...]) and Firebase FCM tokens
 */

// Send notification to a single device token (Expo Push or FCM)
async function sendNotification(token, title, body, data = {}) {
  if (!token) {
    logger.warn("⚠️ Push token missing, skipping push notification.");
    return { success: false, message: "Token missing" };
  }

  // 1. If Expo Push Token
  if (token.startsWith("ExponentPushToken[") || token.startsWith("ExpoPushToken[")) {
    return sendExpoPushNotification([token], title, body, data);
  }

  // 2. Otherwise try Firebase Cloud Messaging
  try {
    if (admin && admin.messaging) {
      const response = await admin.messaging().send({
        token,
        notification: {
          title,
          body,
        },
        data: Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, String(v)])
        ),
      });
      return { success: true, provider: "firebase", response };
    }
  } catch (err) {
    logger.warn(`Firebase push send failed: ${err.message}. Trying Expo fallback.`);
  }

  // Fallback to Expo Push
  return sendExpoPushNotification([token], title, body, data);
}

// Send push notification via Expo Push API (works out-of-the-box in Expo Go & builds)
async function sendExpoPushNotification(tokens, title, body, data = {}) {
  try {
    const validTokens = tokens.filter(Boolean);
    if (validTokens.length === 0) {
      return { success: false, message: "No valid tokens provided" };
    }

    const messages = validTokens.map((to) => ({
      to,
      sound: "default",
      title,
      body,
      data,
      priority: "high",
      channelId: "sushi-orders",
    }));

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    const result = await response.json();
    return { success: true, provider: "expo", result };
  } catch (error) {
    logger.error(`Error sending Expo push notification: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Send Order Lifecycle Push Update
async function sendOrderStatusPush(pushToken, orderId, status) {
  const statusMessages = {
    order_received: {
      title: "🍣 Order Confirmed!",
      body: "Your Sushir Bhai order has been received and sent to the kitchen.",
    },
    preparing: {
      title: "👨‍🍳 Kitchen is Preparing Your Food",
      body: "Our Master Chef is rolling your fresh sushi rolls with precision.",
    },
    on_the_way: {
      title: "🛵 Courier On The Way!",
      body: "Alexei is cruising with your meal. Track him live in real time!",
    },
    delivered: {
      title: "🎉 Order Delivered!",
      body: "Your sushi has arrived. Enjoy your meal and leave a review!",
    },
  };

  const notification = statusMessages[status] || {
    title: `Order Update #${orderId}`,
    body: `Your order status changed to: ${status}`,
  };

  return sendNotification(pushToken, notification.title, notification.body, {
    orderId,
    status,
    screen: "live-tracking",
  });
}

// Send Promo / Marketing Push Notification
async function sendPromoPush(tokens, title, body, promoCode = "SUSHI50") {
  if (Array.isArray(tokens)) {
    return sendExpoPushNotification(tokens, title, body, { promoCode, screen: "menu" });
  }
  return sendNotification(tokens, title, body, { promoCode, screen: "menu" });
}

module.exports = {
  sendNotification,
  sendExpoPushNotification,
  sendOrderStatusPush,
  sendPromoPush,
};