const mongoose = require("mongoose");

// Define the message schema
const messageSchema = mongoose.Schema(
  {
    // Reference to the sender of the message - ObjectId reference to the "User" model
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Content of the message - a string that is trimmed to remove white spaces
    content: { type: String, trim: true },

    // Reference to the chat the message belongs to - ObjectId reference to the "Chat" model
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    // Users who have read the message - array of ObjectId references to the "User" model
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    image: { type: String },

    // MIME type of the image
    imageType: { type: String }, // e.g., 'image/jpeg', 'image/png', etc.
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps to the document
);

// Create the Message model using the messageSchema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
