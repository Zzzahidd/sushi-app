const {
  sendNotification,
} = require("../services/notificationService");

exports.sendPush = async (
  req,
  res
) => {
  try {
    await sendNotification(
      req.body.token,
      req.body.title,
      req.body.body
    );

    res.json({
      success: true,
      message: "Notification Sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};