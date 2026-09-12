const OTP = require("../models/OTP");
const transporter = require("../config/mail");
const otpGenerator = require("otp-generator");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

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

    try {
      if (process.env.EMAIL && process.env.EMAIL_PASSWORD) {
        await transporter.sendMail({
          from: `"Sushir Bhai" <${process.env.EMAIL}>`,
          to: email,
          subject: `🍣 Password Reset OTP: ${otp}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
              <h2 style="color: #FF6B4A; text-align: center;">🍣 Sushir Bhai</h2>
              <p>Your one-time password (OTP) for password reset is:</p>
              <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: bold; background: #FF6B4A; color: white; padding: 10px 24px; border-radius: 8px; letter-spacing: 4px;">${otp}</span>
              </div>
              <p style="color: #666; font-size: 13px;">This code will expire in 10 minutes.</p>
            </div>
          `,
        });
      }
    } catch (mailErr) {
      console.error("Nodemailer error:", mailErr.message);
    }

    res.json({
      success: true,
      message: "OTP Sent successfully",
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
    const record = await OTP.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > new Date(record.expiresAt)) {
      await OTP.deleteOne({ _id: record._id });
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    await OTP.deleteOne({ _id: record._id });

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};