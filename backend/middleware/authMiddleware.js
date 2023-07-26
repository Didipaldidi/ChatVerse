const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

// Middleware function to protect routes and authenticate users with JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request has an Authorization header with a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT_SECRET to obtain the decoded user data
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database using the decoded user id and exclude the password from the retrieved data
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware since the user is authenticated
      next();
    } catch (error) {
      // If token verification fails, send a 401 Unauthorized status and throw an error
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If no token is found in the Authorization header, send a 401 Unauthorized status and throw an error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
