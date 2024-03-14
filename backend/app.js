// importing the required modules
const express = require("express");
const mongoose = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
require("dotenv").config();

// intialising the app
const app = express();

app.use(bodyParser.json());

// declaring the port
const port = process.env.PORT;

// enabling cors for all the routes
app.use(cors());

// routes for the user and admin
app.use("/", userRoute);

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
