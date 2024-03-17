// importing the required modules
const mongoose = require("mongoose");

// declaring the schema for the userDatabase
const users = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    profileImage: {
      type: String,
      default:
        "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg",
      // requried: true,
    },
  },
  { timestamps: true }
);

// exporting the database
module.exports = new mongoose.model("users", users);
