// importing the required modules
const mongoose = require("mongoose");

// establishing the connection
mongoose
  .connect("mongodb://localhost:27017/CRUD_APPLICATION")
  .then(() => {
    console.log("database connected successfully...");
  })
  .catch((error) => {
    console.log("connection failed....", error);
  });

module.exports = mongoose;
