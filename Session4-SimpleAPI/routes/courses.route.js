const express = require("express");

const router = express.Router();

const coursesController = require("../controllers/courses.controller");
const { validationScheme } = require("../middlewares/validationScheme");
const verifyToken = require("../middlewares/verify.token");

router
  .route("/")
  .post(verifyToken, validationScheme(), coursesController.addNewCourse)
  .get(coursesController.getAllCourses);

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(validationScheme(), coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
