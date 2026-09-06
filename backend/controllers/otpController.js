const OTP = require("../models/OTP");
const User = require("../models/User");

const transporter = require("../config/mail");

const otpGenerator =
    require("otp-generator");

exports.sendOTP = async (req, res) => {

    const otp = otpGenerator.generate(6, {

        upperCaseAlphabets: false,

        specialChars: false,

    });

    await OTP.create({

        email: req.body.email,

        otp,

        expiresAt:
            new Date(Date.now() + 300000),

    });

    await transporter.sendMail({

        from: process.env.EMAIL,

        to: req.body.email,

        subject: "Password Reset OTP",

        text: `Your OTP is ${otp}`,

    });

    res.json({

        success: true,

        message: "OTP Sent",

    });

};

exports.verifyOTP = async (req, res) => {

    const record = await OTP.findOne({

        email: req.body.email,

        otp: req.body.otp,

    });

    if (!record) {

        return res.status(400).json({

            success: false,

            message: "Invalid OTP",

        });

    }

    res.json({

        success: true,

    });

};