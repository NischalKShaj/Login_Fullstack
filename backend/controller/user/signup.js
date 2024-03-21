// backend/controller/user/signup.js
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const profilePicture = require("../../middleware/multer");
const errorHandler = require("../../middleware/error.js");
const userCollection = require("../../models/user.js");

// controller for rendering the signup page
module.exports.postSignupPage = (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(email, password, username);
    res.status(200).json({ message: "user signed successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// controller for rendering the login page after signup
module.exports.postLogin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    const user = await userCollection.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ success: false, message: "user already exist" });
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const userDetails = new userCollection({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await userDetails.save();
      res
        .status(200)
        .json({ success: true, message: "signup successs", userDetails });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
