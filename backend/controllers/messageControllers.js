const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const fs = require("fs");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, imageData, imageType } = req.body; // Receive imageData and imageType from the frontend

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  if (imageData && imageType) {
    // Handle image upload and storage
    const savedImage = saveImageToFS(imageData, imageType);
    newMessage.image = savedImage;
  }

  try {
    var message = await Message.create(newMessage);

    // Populate the "sender" and "chat" fields with additional information
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const saveImageToFS = (imageData, imageType) => {
  try {
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${imageType.split("/")[1]}`;

    // Decode the Base64 image data into a Buffer
    const imageBuffer = Buffer.from(imageData, "base64");

    // Define the path to the directory where you want to save the images
    const imageDir = "../images";

    // Create the directory if it doesn't exist
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    // Save the image to the filesystem
    fs.writeFileSync(`${imageDir}/${uniqueFilename}`, imageBuffer);

    // Return the filename for saving in the database
    return uniqueFilename;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error saving image:", error);
    throw error;
  }
};

module.exports = { allMessages, sendMessage };