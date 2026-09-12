const io = require("../SushiFoodApp/node_modules/socket.io-client");
const http = require("http");
const express = require("express");

async function runTests() {
  console.log("==================================================");
  console.log("🧪 TESTING FEATURES #1 & #3: SOCKET.IO GPS & PUSH");
  console.log("==================================================\n");

  const app = express();
  app.use(express.json());

  const { initializeSocket } = require("./socket/socket");
  const trackingRoutes = require("./routes/trackingRoutes");
  const pushRoutes = require("./routes/pushRoutes");

  app.use("/api/tracking", trackingRoutes);
  app.use("/api/push", pushRoutes);

  const server = http.createServer(app);
  initializeSocket(server);

  await new Promise((resolve) => server.listen(5099, resolve));
  console.log("✅ Test server listening on port 5099\n");

  let passed = 0;
  let total = 0;

  async function testCase(name, fn) {
    total++;
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}: ${err.message}`);
    }
  }

  // --- Feature 1: Socket.io Real-Time GPS Tracking Tests ---
  await testCase("Socket.io connection & room join", async () => {
    const client = io("http://localhost:5099", { transports: ["websocket"] });

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Connection timed out")), 4000);
      client.on("connect", () => {
        client.emit("joinOrder", "TEST-ORDER-101");
      });
      client.on("roomJoined", (data) => {
        clearTimeout(timeout);
        if (data.orderId === "TEST-ORDER-101") {
          client.disconnect();
          resolve();
        } else {
          reject(new Error("Incorrect order room joined"));
        }
      });
    });
  });

  await testCase("Socket.io driver GPS location broadcast", async () => {
    const client = io("http://localhost:5099", { transports: ["websocket"] });

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Driver location event timed out")), 4000);
      client.on("connect", () => {
        client.emit("joinOrder", "TEST-ORDER-102");
        setTimeout(() => {
          client.emit("driverLocationUpdate", {
            orderId: "TEST-ORDER-102",
            latitude: 35.6895,
            longitude: 139.6917,
            heading: 65,
            speed: 24,
            etaMinutes: 10,
          });
        }, 100);
      });

      client.on("driverLocation", (data) => {
        clearTimeout(timeout);
        if (data.orderId === "TEST-ORDER-102" && data.latitude === 35.6895) {
          client.disconnect();
          resolve();
        } else {
          reject(new Error("Mismatched driver location payload"));
        }
      });
    });
  });

  await testCase("Socket.io order status update broadcast", async () => {
    const client = io("http://localhost:5099", { transports: ["websocket"] });

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Order status event timed out")), 4000);
      client.on("connect", () => {
        client.emit("joinOrder", "TEST-ORDER-103");
        setTimeout(() => {
          client.emit("orderStatusUpdate", {
            orderId: "TEST-ORDER-103",
            status: "delivered",
            step: 4,
          });
        }, 100);
      });

      client.on("orderStatus", (data) => {
        clearTimeout(timeout);
        if (data.orderId === "TEST-ORDER-103" && data.status === "delivered") {
          client.disconnect();
          resolve();
        } else {
          reject(new Error("Mismatched order status payload"));
        }
      });
    });
  });

  // --- Feature 3: Push Notification API Tests ---
  await testCase("POST /api/push/register-token registers device token", async () => {
    const res = await fetch("http://localhost:5099/api/push/register-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "ExponentPushToken[mock-device-token-123]" }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to register token");
  });

  await testCase("POST /api/push/send-order-update formats order lifecycle push", async () => {
    const res = await fetch("http://localhost:5099/api/push/send-order-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: "ExponentPushToken[mock-device-token-123]",
        orderId: "SB-8924",
        status: "on_the_way",
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to send order push");
  });

  await testCase("POST /api/push/send-promo broadcasts promo push", async () => {
    const res = await fetch("http://localhost:5099/api/push/send-promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "🍣 Special Weekend 40% Off!",
        body: "Get 40% off on all nigiri and maki rolls today!",
        promoCode: "WEEKEND40",
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to send promo push");
  });

  // --- REST Tracking Endpoints ---
  await testCase("GET /api/tracking/:id returns live tracking info", async () => {
    const res = await fetch("http://localhost:5099/api/tracking/SB-8924");
    const data = await res.json();
    if (!data.success || !data.tracking.courier) throw new Error("Invalid tracking response");
  });

  await testCase("POST /api/tracking/:id/simulate triggers GPS simulation", async () => {
    const res = await fetch("http://localhost:5099/api/tracking/SB-8924/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start" }),
    });
    const data = await res.json();
    if (!data.success) throw new Error("Failed to start simulation");

    // Stop simulation
    await fetch("http://localhost:5099/api/tracking/SB-8924/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "stop" }),
    });
  });

  server.close();

  console.log("\n==================================================");
  console.log(`📊 RESULTS: ${passed}/${total} Tests Passed (${Math.round((passed / total) * 100)}%)`);
  console.log("==================================================");

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
