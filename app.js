// importing the required modules
// fhdsjkhfklsdf
const express = require("express");
const mongoose = require("./backend/config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./backend/routes/user");
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

// starting the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
