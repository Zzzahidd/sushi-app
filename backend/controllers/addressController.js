const Address = require("../models/Address");

// Get all addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    }).sort({ isDefault: -1, createdAt: -1 });

    res.json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add address
exports.addAddress = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user: req.user._id,
    };

    if (data.isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { isDefault: false }
      );
    }

    const address = await Address.create(data);

    res.status(201).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    if (req.body.isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { isDefault: false }
      );
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Set default address
exports.setDefaultAddress = async (req, res) => {
  try {
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );

    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};