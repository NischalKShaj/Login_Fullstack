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

    // profileImage: {
    //   type: String,
    //   requried: true,
    // },
  },
  { timestamps: true }
);

// exporting the database
module.exports = new mongoose.model("users", users);
