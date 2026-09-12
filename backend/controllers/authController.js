const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OTP = require("../models/OTP");
const transporter = require("../config/mail");
const generateToken = require("../utils/generateToken");
const otpGenerator = require("otp-generator");

// Helper to send branded OTP email
async function sendOTPEmail(email, name, otp, purpose = "Account Verification") {
  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 25px; border: 1px solid #f0f0f0; border-radius: 16px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #FF6B4A; margin: 0; font-size: 28px; font-weight: 800;">🍣 Sushir Bhai</h1>
        <p style="color: #777; font-size: 14px; margin-top: 5px;">Fresh & Delicious Sushi Delivered Fast</p>
      </div>
      <div style="background-color: #FFF5F2; border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;">
        <h2 style="color: #222; font-size: 20px; margin-top: 0;">${purpose}</h2>
        <p style="color: #555; font-size: 15px; margin-bottom: 20px;">Hello ${name || "Sushi Lover"}, use the verification code below to complete your registration:</p>
        <div style="display: inline-block; background-color: #FF6B4A; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: 6px; padding: 12px 30px; border-radius: 10px;">
          ${otp}
        </div>
        <p style="color: #888; font-size: 13px; margin-top: 15px; margin-bottom: 0;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
      </div>
      <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">If you didn't request this code, you can safely ignore this email.</p>
    </div>
  `;

  try {
    if (process.env.EMAIL && process.env.EMAIL_PASSWORD) {
      await transporter.sendMail({
        from: `"Sushir Bhai" <${process.env.EMAIL}>`,
        to: email,
        subject: `🍣 Your Sushir Bhai Verification Code: ${otp}`,
        html: htmlContent,
      });
      console.log(`✅ OTP email sent to ${email}`);
      return true;
    } else {
      console.warn("⚠️ EMAIL or EMAIL_PASSWORD not set in .env. OTP logged to console:", otp);
      return false;
    }
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err.message);
    return false;
  }
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone: phone || "",
      password: hashedPassword,
      isVerified: false,
    });

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP to collection with 10-min expiry
    await OTP.deleteMany({ email });
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send email asynchronously
    sendOTPEmail(email, name, otp, "Verify Your New Account");

    res.status(201).json({
      success: true,
      message: "Registration successful! Verification OTP has been sent to your email.",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
      },
      // In development or if mail credentials are placeholder, include otp in response for seamless developer flow
      devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const record = await OTP.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (new Date() > new Date(record.expiresAt)) {
      await OTP.deleteOne({ _id: record._id });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Mark user as verified
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    // Remove used OTP
    await OTP.deleteOne({ _id: record._id });

    const token = user ? generateToken(user._id) : null;

    res.json({
      success: true,
      message: "Account verified successfully!",
      token,
      user: user
        ? {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    const name = user ? user.name : "Customer";

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.deleteMany({ email });
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOTPEmail(email, name, otp, "New Verification Code");

    res.json({
      success: true,
      message: "New OTP has been sent to your email.",
      devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.profile = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};