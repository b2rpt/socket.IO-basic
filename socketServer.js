import http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    // CORS policy
    origin: "*", // allow all origins
  },
});

io.on("connection", (socket) => {
  // console.log(socket.handshake.headers);
  console.log("A user connected"); // log when a user connects

  socket.on("client-message", (message) => {
    console.log(message);
    io.emit(
      "server-message",
      `${socket.id} hello from the server to all connected clients`
    ); // emit a message to all connected clients
  });

  socket.emit("server-message-to-client", {
    data: "hello from the server to the client",
  }); // emit a message to the connected client

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // log when a user disconnects
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
