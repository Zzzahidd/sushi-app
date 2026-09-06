const User = require("../models/User");

exports.verifyEmail = async (req, res) => {

    const user = await User.findByIdAndUpdate(

        req.params.id,

        {
            isVerified: true,
        },

        {
            new: true,
        }

    );

    res.json({

        success: true,

        user,

    });

};