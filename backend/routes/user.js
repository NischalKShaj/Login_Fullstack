// importing the required modules
const express = require("express");
const router = express.Router();
const loginController = require("../controller/user/login");
const upload = require("../middleware/multer");

// declaring the routes for the user
router.get("/", loginController.getLogin);
router.post("/home", loginController.postHome);
router.post("/signup", upload.single("file"), loginController.postSignupPage);

module.exports = router;
