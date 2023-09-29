const express = require("express");

const router = express.Router();

const coursesController = require("../controllers/courses.controller");
const {
  titleValidation,
  priceValidation,
  validationScheme
} = require("../middlewares/validationScheme");

router
  .route("/")
  .post(validationScheme(), coursesController.addNewCourse)
  .get(coursesController.getAllCourses);

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(validationScheme(), coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
