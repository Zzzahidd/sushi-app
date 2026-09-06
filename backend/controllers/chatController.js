const Chat = require("../models/Chat");

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const chat = await Chat.create({
      order: req.body.order,
      sender: req.user._id,
      receiver: req.body.receiver,
      message: req.body.message,
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Order Chat
exports.getMessages = async (req, res) => {
  try {
    const chats = await Chat.find({
      order: req.params.orderId,
    })
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      count: chats.length,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Read
exports.markRead = async (req, res) => {
  try {
    await Chat.updateMany(
      {
        receiver: req.user._id,
        order: req.params.orderId,
      },
      {
        isRead: true,
      }
    );

    res.json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};