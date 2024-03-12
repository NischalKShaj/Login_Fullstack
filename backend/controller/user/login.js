// backend/controller/user/login.js
const express = require("express");
const router = express.Router();

// controller for showing the login page
module.exports.getLogin = (req, res) => {
  res.json({ message: "You are in the login page" });
};

// controller for rendering the home page
module.exports.postHome = (req, res) => {
  const { email, password } = req.body;
  console.log("Received request at /home");
  console.log("Email:", email);
  console.log("Password:", password);

  if (email && password) {
    res.status(200).json({ success: true, message: "User logged in" });
  } else {
    res.status(401).json({ success: false, message: "User not logged in" });
  }
};

// controller for rendering the signup page
module.exports.postSignupPage = (req, res) => {
  try {
    // logic for signup
  } catch (error) {
    console.log(error);
  }
};
