""; // importing the required modules
const express = require("express");
const router = express.Router();
const loginController = require("../controller/admin/login");

// roters for the admin
router.get("/", loginController.getAdminLogin);
router.get("/logout", loginController.getLogout);
router.post("/dashbord", loginController.postAdminDashBoard);

// exporting the router
module.exports = router;
