let io;

// In-memory simulation intervals keyed by orderId
const activeSimulations = new Map();

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 [Socket.io] Client connected: ${socket.id}`);

    // Join order room
    socket.on("joinOrder", (orderId) => {
      if (!orderId) return;
      const room = `order_${orderId}`;
      socket.join(room);
      socket.join(orderId.toString());
      console.log(`📡 [Socket.io] Client ${socket.id} joined room for order: ${orderId}`);
      
      // Confirm room join to client
      socket.emit("roomJoined", { orderId, room, success: true });
    });

    // Leave order room
    socket.on("leaveOrder", (orderId) => {
      if (!orderId) return;
      socket.leave(`order_${orderId}`);
      socket.leave(orderId.toString());
      console.log(`🚪 [Socket.io] Client ${socket.id} left room for order: ${orderId}`);
    });

    // Driver location update from courier app / driver dashboard
    socket.on("driverLocationUpdate", (data) => {
      const { orderId, latitude, longitude, heading = 0, speed = 0, etaMinutes = 12, courierName = "Alexei Volkov" } = data;
      if (!orderId) return;

      const payload = {
        orderId,
        latitude,
        longitude,
        heading,
        speed,
        etaMinutes,
        courierName,
        timestamp: new Date().toISOString(),
      };

      // Broadcast to both room formats
      io.to(`order_${orderId}`).emit("driverLocation", payload);
      io.to(orderId.toString()).emit("driverLocation", payload);
      io.to(`order_${orderId}`).emit("tracking", payload);
      io.to(orderId.toString()).emit("tracking", payload);
    });

    // Order status update (e.g. Received -> Prepared -> On Way -> Delivered)
    socket.on("orderStatusUpdate", (data) => {
      const { orderId, status, step = 1, message = "" } = data;
      if (!orderId) return;

      const payload = {
        orderId,
        status,
        step,
        message,
        timestamp: new Date().toISOString(),
      };

      io.to(`order_${orderId}`).emit("orderStatus", payload);
      io.to(orderId.toString()).emit("orderStatus", payload);
    });

    // Start simulated GPS trajectory for realistic testing
    socket.on("startGpsSimulation", (data) => {
      const { orderId = "SB-8924" } = data || {};
      startSimulatedDriverTrip(orderId);
    });

    socket.on("stopGpsSimulation", (data) => {
      const { orderId = "SB-8924" } = data || {};
      stopSimulatedDriverTrip(orderId);
    });

    socket.on("disconnect", () => {
      console.log(`❌ [Socket.io] Client disconnected: ${socket.id}`);
    });
  });
};

// Waypoint coordinates simulating a courier trip in Tokyo / City
const SIMULATED_COURIER_WAYPOINTS = [
  { latitude: 35.6895, longitude: 139.6917, heading: 45, speed: 22, etaMinutes: 14, status: "on_the_way", step: 3, note: "Courier picked up your order" },
  { latitude: 35.6908, longitude: 139.6934, heading: 55, speed: 26, etaMinutes: 12, status: "on_the_way", step: 3, note: "Approaching Chuo Avenue" },
  { latitude: 35.6924, longitude: 139.6958, heading: 60, speed: 28, etaMinutes: 10, status: "on_the_way", step: 3, note: "Cruising down Sushi Boulevard" },
  { latitude: 35.6942, longitude: 139.6982, heading: 70, speed: 25, etaMinutes: 8, status: "on_the_way", step: 3, note: "Passing Shibuya Crossing" },
  { latitude: 35.6960, longitude: 139.7005, heading: 80, speed: 20, etaMinutes: 5, status: "on_the_way", step: 3, note: "Turning onto your block" },
  { latitude: 35.6975, longitude: 139.7020, heading: 90, speed: 15, etaMinutes: 2, status: "on_the_way", step: 3, note: "Alexei is right outside your door!" },
  { latitude: 35.6985, longitude: 139.7032, heading: 90, speed: 0, etaMinutes: 0, status: "delivered", step: 4, note: "Order delivered! Enjoy your sushi 🍣" },
];

function startSimulatedDriverTrip(orderId) {
  if (!io) return;
  stopSimulatedDriverTrip(orderId);

  let currentIndex = 0;
  console.log(`🚀 [Socket.io] Starting driver GPS simulation for order: ${orderId}`);

  const intervalId = setInterval(() => {
    if (currentIndex >= SIMULATED_COURIER_WAYPOINTS.length) {
      stopSimulatedDriverTrip(orderId);
      return;
    }

    const point = SIMULATED_COURIER_WAYPOINTS[currentIndex];
    const payload = {
      orderId,
      ...point,
      courierName: "Alexei Volkov",
      courierPhone: "+1 (555) 349-2810",
      courierRating: "4.9",
      courierDeliveries: "1,840",
      timestamp: new Date().toISOString(),
    };

    io.to(`order_${orderId}`).emit("driverLocation", payload);
    io.to(orderId.toString()).emit("driverLocation", payload);
    io.to(`order_${orderId}`).emit("tracking", payload);
    io.to(orderId.toString()).emit("tracking", payload);

    if (point.status === "delivered") {
      io.to(`order_${orderId}`).emit("orderStatus", {
        orderId,
        status: "delivered",
        step: 4,
        message: point.note,
      });
    }

    currentIndex++;
  }, 3000); // update every 3 seconds

  activeSimulations.set(orderId, intervalId);
}

function stopSimulatedDriverTrip(orderId) {
  if (activeSimulations.has(orderId)) {
    clearInterval(activeSimulations.get(orderId));
    activeSimulations.delete(orderId);
    console.log(`⏹️ [Socket.io] Stopped driver simulation for order: ${orderId}`);
  }
}

const getIO = () => io;

const broadcastDriverLocation = (orderId, data) => {
  if (!io || !orderId) return;
  const payload = { orderId, ...data, timestamp: new Date().toISOString() };
  io.to(`order_${orderId}`).emit("driverLocation", payload);
  io.to(orderId.toString()).emit("driverLocation", payload);
  io.to(`order_${orderId}`).emit("tracking", payload);
  io.to(orderId.toString()).emit("tracking", payload);
};

const broadcastOrderStatus = (orderId, data) => {
  if (!io || !orderId) return;
  const payload = { orderId, ...data, timestamp: new Date().toISOString() };
  io.to(`order_${orderId}`).emit("orderStatus", payload);
  io.to(orderId.toString()).emit("orderStatus", payload);
};

module.exports = {
  initializeSocket,
  getIO,
  startSimulatedDriverTrip,
  stopSimulatedDriverTrip,
  broadcastDriverLocation,
  broadcastOrderStatus,
};