const admin = require("../config/firebase");

exports.sendNotification = async (
  token,
  title,
  body
) => {
  return admin.messaging().send({
    token,

    notification: {
      title,
      body,
    },
  });
};