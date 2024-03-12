// importing the required modules
const express = require("express");
const router = express.Router();
const loginController = require("../controller/user/login");

// declaring the routes for the user
router.get("/", loginController.getLogin);
router.post("/home", loginController.postHome);
router.post("/signup", loginController.postSignupPage);

module.exports = router;
