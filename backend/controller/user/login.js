// backend/controller/user/login.js
const express = require("express");
const router = express.Router();
// const profilePicture = require("../../middleware/multer");
const userCollection = require("../../models/user");

// controller for showing the login page
module.exports.getLogin = (req, res) => {
  res.json({ message: "You are in the login page" });
};

// controller for rendering the home page
module.exports.postHome = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });

    if (user && user.password === password) {
      console.log("user logged successfully");
      res.status(200).json({ success: true, message: "user logged in" });
    } else {
      res.status(401).json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

// controller for rendering the signup page
module.exports.postSignupPage = (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(email, password, firstname, lastname);
    res.status(200).json({ message: "user signed successfully" });
  } catch (error) {
    console.log(error);
  }
};

// controller for rendering the login page after signup
module.exports.postLogin = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(firstname, lastname, email, password);

    const user = await userCollection.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ success: false, message: "user already exist" });
    } else {
      const userDetails = new userCollection({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });
      await userDetails.save();
      res.status(200).json({ success: true, message: "signup successs" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
