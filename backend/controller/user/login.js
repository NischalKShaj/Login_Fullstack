// backend/controller/user/login.js
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const profilePicture = require("../../middleware/multer");
const errorHandler = require("../../middleware/error");
const userCollection = require("../../models/user");

// controller for showing the login page
module.exports.getLogin = (req, res) => {
  res.json({ message: "You are in the login page" });
};

// controller for rendering the home page
module.exports.postHome = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    // setting the jwt token for the userlogin
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// controller for rendering the signup page
module.exports.postSignupPage = (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(email, password, firstname, lastname);
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
      res.status(200).json({ success: true, message: "signup successs" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
