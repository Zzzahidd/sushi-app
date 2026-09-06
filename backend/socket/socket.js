let io;

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinOrder", (orderId) => {
      socket.join(orderId);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};

const getIO = () => io;

module.exports = {
  initializeSocket,
  getIO,
};