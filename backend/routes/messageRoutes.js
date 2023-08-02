const express = require("express");
const multer = require("multer"); // Import multer for handling image uploads
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer storage configuration for image uploads
const storage = multer.memoryStorage(); // Use memory storage to handle image uploads as buffers
const upload = multer({ storage: storage });

// Route to get all messages of a specific chat
router.route("/:chatId").get(protect, allMessages);

// Route to send a new message to a chat
router.route("/").post(protect, upload.single("imageData"), sendMessage);

module.exports = router;
