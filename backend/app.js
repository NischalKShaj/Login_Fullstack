// importing the required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("./config/database");
const cors = require("cors");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const path = require("path");
require("dotenv").config();

// intialising the app
const app = express();

// enabling the cookie parser
app.use(cookieParser());

// setting up the public files
app.use(express.static(path.join(__dirname, "uploads")));

// for passing the user details
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// declaring the port
const port = process.env.PORT;

// enabling cors for all the routes
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// routes for the user and admin
app.use("/", userRoute);
app.use("/admin", adminRoute);

// error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

// starting the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
