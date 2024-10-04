// server.js
const express = require("express");
const cors = require("cors");
const http = require("http"); // Import the HTTP module
const { Server } = require("socket.io"); // Import Socket.IO
const routes = require("./routes");
const sequelize = require("./config/db");

const app = express();

// Middleware
app.use(cors({ exposedHeaders: ["Content-Disposition"] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Update this in production to restrict origins
    methods: ["GET", "POST"],
  },
});

// Store the io instance in the app for access in controllers
app.set("io", io);

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Optional: Handle joining specific rooms
  socket.on("joinRoom", ({ studentId }) => {
    socket.join(`student_${studentId}`);
    console.log(`Socket ${socket.id} joined room student_${studentId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
      console.log("Database synced successfully");
    })
    .catch((err) => {
      console.error("Error syncing database:", err);
    });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
