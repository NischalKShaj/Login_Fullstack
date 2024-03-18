// importing the required modules
const express = require("express");
const router = express.Router();
const loginController = require("../controller/user/login");
const googleAuth = require("../controller/user/googleAuth");
const signupController = require("../controller/user/signup");
const verifyToken = require("../middleware/userAuth");
const uploadImage = require("../middleware/multer");

// declaring the routes for the user
router.get("/", loginController.getLogin);
router.post("/", signupController.postLogin);
router.post("/home", loginController.postHome);
router.post("/signup", signupController.postSignupPage);
router.post("/auth/google", googleAuth.postGoogleAuth);
router.post(
  "/update/:id",
  verifyToken.authenticateUserJwt,
  uploadImage.single("profileImage"),
  loginController.updateUserProfile
);

module.exports = router;
