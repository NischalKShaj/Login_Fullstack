const express = require("express");
const router = express.Router();

module.exports.getLogin = async (req, res) => {
  res.json({ message: "you are in the login page" });
};
