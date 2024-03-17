// importing the required modules
const express = require("express");
const router = express.Router();
const loginController = require("../controller/user/login");
const upload = require("../middleware/multer");

// declaring the routes for the user
router.get("/", loginController.getLogin);
router.post("/", loginController.postLogin);
router.post("/home", loginController.postHome);
router.post("/signup", loginController.postSignupPage);
router.post("/auth/google", loginController.googleAuth);

module.exports = router;
