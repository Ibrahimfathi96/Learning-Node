const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/roles");

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
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER
  },
  avatar: {
    type: String,
    default: "/uploads/pp-placeholder.png"
  }
});

module.exports = mongoose.model("User", userScheme);
