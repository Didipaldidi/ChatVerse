const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to access a chat (Create chat for a user)
router.route("/").post(protect, accessChat);

// Route to fetch all chats for a user
router.route("/").get(protect, fetchChats);

// Route to create a group chat
router.route("/group").post(protect, createGroupChat);

// Route to rename a group chat
router.route("/rename").put(protect, renameGroup);

// Route to remove a member from a group chat
router.route("/groupremove").put(protect, removeFromGroup);

// Route to add a member to a group chat
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
