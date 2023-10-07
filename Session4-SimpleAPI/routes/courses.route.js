const express = require("express");

const router = express.Router();

const coursesController = require("../controllers/courses.controller");
const { validationScheme } = require("../middlewares/validationScheme");
const verifyToken = require("../middlewares/verify.token");
const userRoles = require("../utils/roles");
const allowedTo = require("../middlewares/allowedTo");

router
  .route("/")
  .post(
    verifyToken,
    allowedTo(userRoles.MANAGER),
    validationScheme(),
    coursesController.addNewCourse
  )
  .get(coursesController.getAllCourses);

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(validationScheme(), coursesController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    coursesController.deleteCourse
  );

module.exports = router;
