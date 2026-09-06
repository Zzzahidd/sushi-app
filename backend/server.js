const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const morgan = require("morgan");

// Config
dotenv.config();

const connectDB = require("./config/db");
const logger = require("./config/logger");
const { swaggerUi, specs } = require("./config/swagger");
const { initializeSocket } = require("./socket/socket");

// ======================
// Database
// ======================

connectDB();

// ======================
// App
// ======================

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

// ======================
// Middlewares
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Upload Folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Swagger Docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// ======================
// Routes
// ======================

// Authentication
const authRoutes = require("./routes/authRoutes");

// Restaurant
const restaurantRoutes = require("./routes/restaurantRoutes");

// Category
const categoryRoutes = require("./routes/categoryRoutes");

// Product
const productRoutes = require("./routes/productRoutes");

// Search
const searchRoutes = require("./routes/searchRoutes");

// Cart
const cartRoutes = require("./routes/cartRoutes");

// Orders
const orderRoutes = require("./routes/orderRoutes");

// Payment
const paymentRoutes = require("./routes/paymentRoutes");

// Coupons
const couponRoutes = require("./routes/couponRoutes");

// Address
const addressRoutes = require("./routes/addressRoutes");

// Notification
const notificationRoutes = require("./routes/notificationRoutes");

// Reviews
const reviewRoutes = require("./routes/reviewRoutes");

// Favorites
const favoriteRoutes = require("./routes/favoriteRoutes");

// Profile
const profileRoutes = require("./routes/profileRoutes");

// Chat
const chatRoutes = require("./routes/chatRoutes");

// Upload
const uploadRoutes = require("./routes/uploadRoutes");

// Admin
const adminRoutes = require("./routes/adminRoutes");

// Admin Auth
const adminAuthRoutes = require("./routes/adminAuthRoutes");

// Analytics
const analyticsRoutes = require("./routes/analyticsRoutes");

// OTP
const otpRoutes = require("./routes/otpRoutes");

// Email Verification
const verificationRoutes = require("./routes/verificationRoutes");

// Tracking
const trackingRoutes = require("./routes/trackingRoutes");

// Push Notification
const pushRoutes = require("./routes/pushRoutes");

// Stripe
const stripeRoutes = require("./routes/stripeRoutes");

// ======================
// API Routes
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/coupons", couponRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin", adminAuthRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/otp", otpRoutes);

app.use("/api/verification", verificationRoutes);

app.use("/api/tracking", trackingRoutes);

app.use("/api/push", pushRoutes);

app.use("/api/stripe", stripeRoutes);

// ======================
// Root Route
// ======================

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "Food Delivery Backend API",
    version: "1.0.0",
    status: "Running",
    documentation: "/api-docs",
  });
});

// ======================
// 404 Route
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Error Handler
// ======================

app.use((err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ======================
// Server
// ======================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`Food Delivery API Started`);
  console.log(
    `🚀 Server Running on http://localhost:${PORT}`
  );
  console.log(
    `📘 Swagger Docs: http://localhost:${PORT}/api-docs`
  );
});