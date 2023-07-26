const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all users. It requires authentication using the protect middleware.
router.route("/").get(protect, allUsers);

// Route to register a new user. It uses the registerUser controller function to handle the registration process.
router.route("/").post(registerUser);

// Route to authenticate a user and generate a token for login. It uses the authUser controller function to handle the login process.
router.post("/login", authUser);

module.exports = router;
