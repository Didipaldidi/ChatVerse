const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all messages of a specific chat
router.route("/:chatId").get(protect, allMessages);

// Route to send a new message to a chat
router.route("/").post(protect, sendMessage);

module.exports = router;
