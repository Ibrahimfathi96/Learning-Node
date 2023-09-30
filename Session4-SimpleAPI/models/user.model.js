const mongoose = require("mongoose");
const validator = require("validator");

const userScheme = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validator.isEmail, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

module.exports = mongoose.model("User", userScheme);
