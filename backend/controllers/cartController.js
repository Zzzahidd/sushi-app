const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get User Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.json({
        success: true,
        items: [],
        subtotal: 0,
        total: 0,
      });
    }

    let subtotal = 0;

    cart.items.forEach((item) => {
      subtotal +=
        item.product.price * item.quantity;
    });

    const deliveryFee = 5;
    const tax = subtotal * 0.05;
    const total =
      subtotal + deliveryFee + tax;

    res.json({
      success: true,
      cart,
      subtotal,
      deliveryFee,
      tax,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Product
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const index = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity +=
        quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Quantity
exports.updateQuantity = async (
  req,
  res
) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    const item = cart.items.id(req.params.id);

    item.quantity = quantity;

    await cart.save();

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product
exports.removeItem = async (
  req,
  res
) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !==
        req.params.productId
    );

    await cart.save();

    res.json({
      success: true,
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};