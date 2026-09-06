const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

exports.analytics = async (req, res) => {

    try {

        const totalUsers =
            await User.countDocuments();

        const totalOrders =
            await Order.countDocuments();

        const totalProducts =
            await Product.countDocuments();

        const revenue =
            await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        revenue: {
                            $sum: "$total",
                        },
                    },
                },
            ]);

        res.json({

            success: true,

            analytics: {

                totalUsers,

                totalOrders,

                totalProducts,

                revenue:
                    revenue.length > 0
                        ? revenue[0].revenue
                        : 0,

            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};