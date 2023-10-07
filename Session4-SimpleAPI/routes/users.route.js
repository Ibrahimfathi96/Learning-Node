const express = require("express");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  }
});
const fileFilter = (req, file, cb) => {
  const imgType = file.mimetype.split("/")[0];
  if (imgType === "image") {
    return cb(null, true);
  } else {
    return cb(appErrors.create("Only images are allowed!", 400), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

const router = express.Router();
const usersController = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verify.token");
const appErrors = require("../utils/appErrors");

router.route("/").get(verifyToken, usersController.getAllUsers);
router
  .route("/register")
  .post(upload.single("avatar"), usersController.registerUser);
router.route("/login").post(usersController.loginUser);

module.exports = router;
