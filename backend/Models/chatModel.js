const mongoose = require("mongoose");

// Define the chat model schema
const chatModel = mongoose.Schema(
  {
    // Chat name (optional) - a string that is trimmed to remove white spaces
    chatName: { type: String, trim: true },

    // Indicates whether the chat is a group chat or not. Default value is false.
    isGroupChat: { type: Boolean, default: false },

    // Users participating in the chat - array of ObjectId references to the "User" model
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Reference to the latest message in the chat - ObjectId reference to the "Message" model
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    // Reference to the admin user (applicable for group chats only) - ObjectId reference to the "User" model
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps to the document
);

// Create the Chat model using the chatModel schema
const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
