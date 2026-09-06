const User = require("../models/User");

// Get Profile
exports.getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
exports.updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.user._id,
        req.body,
        {
          new: true,
        }
      ).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Avatar
exports.updateAvatar = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.user._id,
        {
          avatar: req.file
            ? req.file.filename
            : "",
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};