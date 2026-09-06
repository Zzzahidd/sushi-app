const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const keyPath = path.join(__dirname, "../firebase-key.json");

if (fs.existsSync(keyPath)) {
  const serviceAccount = require(keyPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.warn("⚠️ firebase-key.json not found in backend directory. Push notifications will be disabled until it is added.");
}

module.exports = admin;