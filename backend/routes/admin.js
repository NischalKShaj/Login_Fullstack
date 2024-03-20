""; // importing the required modules
const express = require("express");
const router = express.Router();
const loginController = require("../controller/admin/login");
const updateImage = require("../middleware/multer");
const verifyAdminToken = require("../middleware/adminAuth");

// roters for the admin
router.get("/", loginController.getAdminLogin);
router.get("/logout", loginController.getLogout);
router.post("/dashbord", loginController.postAdminDashBoard);
router.post(
  "/dashbord/edit/:id",
  verifyAdminToken.authenticateAdminJwt,
  updateImage.single("profileImage"),
  loginController.postUserEdit
);

// exporting the router
module.exports = router;
