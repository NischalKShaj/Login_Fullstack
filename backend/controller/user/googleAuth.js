// backend/controller/user/googleAuth.js
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userCollection = require("../../models/user.js");

// controller for google authentication
module.exports.postGoogleAuth = async (req, res) => {
  try {
    const user = await userCollection.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new userCollection({
        username: req.body.username.split(" ").join(""),
        email: req.body.email,
        password: hashedPassword,
        profileImage: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log("error", error);
  }
};
