// Import required modules
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Create Express app
const app = express();

// Middleware to parse JSON data in requests
app.use(express.json());

// Routes handling for user, chat, and message APIs
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// -------------------------- Deployment Configuration ------------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   // Serve static files from the "frontend/build" directory in production
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   // Handle all other routes by serving the index.html file for client-side routing
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//   );
// } else {
//   // Default route for development environment
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// -------------------------- Deployment Configuration ------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server on the specified port
const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

// Set up Socket.IO for real-time communication
const io = require("socket.io")(server, {
  pingTimeout: 60000, // Set a ping timeout of 60 seconds
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    // credentials: true, // Enable CORS credentials (if needed)
  },
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // Set up event for user setup and join room
  socket.on("setup", (userData) => {
    socket.join(userData._id); // Join a room based on user's ID
    socket.emit("connected"); // Emit "connected" event to the client
  });

  // Join a chat room
  socket.on("join chat", (room) => {
    socket.join(room); // Join a room based on chat room ID
    console.log("User Joined Room: " + room);
  });

  // Handle typing and stop typing events
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handle new message event and broadcast it to relevant users in the chat
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  // Handle user disconnection event
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id); // Leave the room when user disconnects
  });
});
