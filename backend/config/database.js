// importing the required modules
const mongoose = require("mongoose");
require("dotenv").config();

// establishing the connection
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("database connected successfully...");
  })
  .catch((error) => {
    console.log("connection failed....", error);
  });

module.exports = mongoose;
