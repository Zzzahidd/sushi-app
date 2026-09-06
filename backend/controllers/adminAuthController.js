const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json({
            success: true,
            users,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateUserRole = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                role: req.body.role,
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