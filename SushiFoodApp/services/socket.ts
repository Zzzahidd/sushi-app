import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "./api";

// Derive Socket URL from API_BASE_URL (removing trailing /api if present)
const SOCKET_URL =
  process.env.EXPO_PUBLIC_SOCKET_URL ||
  API_BASE_URL.replace(/\/api\/?$/, "");

export interface DriverLocationData {
  orderId: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  etaMinutes?: number;
  courierName?: string;
  courierPhone?: string;
  courierRating?: string;
  status?: string;
  timestamp?: string;
  note?: string;
}

export interface OrderStatusData {
  orderId: string;
  status: "order_received" | "preparing" | "on_the_way" | "delivered" | string;
  step?: number;
  message?: string;
  timestamp?: string;
}

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 10000,
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log("🟢 [Socket.io] Connected successfully. Socket ID:", socketInstance?.id);
    });

    socketInstance.on("connect_error", (err) => {
      console.warn("⚠️ [Socket.io] Connection error:", err.message);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("🔴 [Socket.io] Disconnected:", reason);
    });
  }

  return socketInstance;
};

// Join order room for real-time tracking updates
export const joinOrderRoom = (orderId: string) => {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit("joinOrder", orderId);
  } else {
    socket.once("connect", () => {
      socket.emit("joinOrder", orderId);
    });
  }
};

// Leave order tracking room
export const leaveOrderRoom = (orderId: string) => {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit("leaveOrder", orderId);
  }
};

// Subscribe to real-time driver GPS updates
export const subscribeToDriverLocation = (
  callback: (data: DriverLocationData) => void
) => {
  const socket = getSocket();

  const handleLocation = (data: DriverLocationData) => {
    callback(data);
  };

  socket.on("driverLocation", handleLocation);
  socket.on("tracking", handleLocation);

  return () => {
    socket.off("driverLocation", handleLocation);
    socket.off("tracking", handleLocation);
  };
};

// Subscribe to order lifecycle status changes
export const subscribeToOrderStatus = (
  callback: (data: OrderStatusData) => void
) => {
  const socket = getSocket();

  const handleStatus = (data: OrderStatusData) => {
    callback(data);
  };

  socket.on("orderStatus", handleStatus);

  return () => {
    socket.off("orderStatus", handleStatus);
  };
};

// Trigger simulated GPS driver movement for testing / live demo
export const triggerGpsSimulation = (orderId: string = "SB-8924") => {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit("startGpsSimulation", { orderId });
  } else {
    socket.once("connect", () => {
      socket.emit("startGpsSimulation", { orderId });
    });
  }
};

// Stop GPS simulation
export const stopGpsSimulation = (orderId: string = "SB-8924") => {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit("stopGpsSimulation", { orderId });
  }
};
