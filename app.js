// importing the required modules
const express = require("express");
const mongoose = require("./backend/config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// intialising the app
const app = express();

app.use(bodyParser.json());

// declaring the port
const port = process.env.PORT || 4000;

// enabling cors for all the routes
app.use(cors());

// starting the server
app.listen(port, () => {
  console.log(`http:localhost://${port}`);
});
