const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = mongoose.Schema(
  {
    // User's name - a required string
    name: { type: "String", required: true },

    // User's email - a unique and required string
    email: { type: "String", unique: true, required: true },

    // User's password - a required string
    password: { type: "String", required: true },

    // User's profile picture URL - a string with a default avatar image
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    // Whether the user is an admin - a boolean with a default value of false
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps to the document
);

// Method to compare entered password with the user's hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Password encryption using bcrypt before saving the user data
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create the User model using the userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;
