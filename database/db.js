const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

// Database connection
function mongoConnection(url) {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    });
}

module.exports = mongoConnection;
