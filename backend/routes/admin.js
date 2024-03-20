""; // importing the required modules
const express = require("express");
const router = express.Router();
const loginController = require("../controller/admin/login");
const updateImageAdmin = require("../middleware/multer");
const verifyAdminToken = require("../middleware/adminAuth");

// roters for the admin
router.get("/", loginController.getAdminLogin);
router.get("/logout", loginController.getLogout);
router.post("/dashbord", loginController.postAdminDashBoard);
router.post(
  "/dashbord/edit/:id",
  verifyAdminToken.authenticateAdminJwt,
  updateImageAdmin.single("profileImage"),
  loginController.postUserEdit
);
router.delete(
  "/dashbord/delete/:id",
  verifyAdminToken.authenticateAdminJwt,
  loginController.deleteUser
);

// exporting the router
module.exports = router;
