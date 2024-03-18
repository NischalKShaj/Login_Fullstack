// backend/controller/user/login.js
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const profilePicture = require("../../middleware/multer");
const errorHandler = require("../../middleware/error.js");
const userCollection = require("../../models/user.js");

// controller for showing the login page
module.exports.getLogin = (req, res) => {
  res.json({ message: "You are in the login page" });
};

// controller for rendering the home page
module.exports.postHome = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
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
    console.log("token in controller", token);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// controller for updating the user profile
module.exports.updateUserProfile = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(
        errorHandler.handleError(401, "You can update your account only")
      );
    }
    const { username, email } = req.body;
    console.log(username, email);
    // Access uploaded file
    const profileImage = req.file;

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await userCollection.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profileImage: profileImage.filename,
        },
      },
      { new: true }
    );
    console.log(updatedUser);
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
