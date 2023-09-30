const express = require("express");

const router = express.Router();
const usersController = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verify.token");

router.route("/").get(verifyToken, usersController.getAllUsers);
router.route("/register").post(usersController.registerUser);
router.route("/login").post(usersController.loginUser);

module.exports = router;
