// backend/controller/admin/login.js
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../middleware/error.js");
const userCollection = require("../../models/user.js");

// controller for showing the admin login page
module.exports.getAdminLogin = (req, res) => {
  res.json("admin login page");
};

// controller for showing the admindashboard after the login
module.exports.postAdminDashBoard = async (req, res) => {
  console.log("inside the router");
  try {
    const adminMail = req.body.email;
    const adminPassword = req.body.password;
    const userDetails = await userCollection.find();
    console.log(userDetails);
    if (adminMail !== process.env.ADMIN_EMAIL)
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    if (adminPassword !== process.env.ADMIN_PASSWORD)
      return res
        .status(401)
        .json({ success: false, message: "invalid credentials" });
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      process.env.ADMIN_JWT_SECRET
    );
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    res
      .cookie("admin_access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json({ success: true, message: "Login successful", email: adminMail });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// controller for logout from the admin page
module.exports.getLogout = async (req, res, next) => {
  try {
    res.clearCookie("admin_access_token").status(200).json("signout success");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
