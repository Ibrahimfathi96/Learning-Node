const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
const { min } = require("lodash");
app.use(express.json()); //bodyParser
const port = 4000;
const coursesController = require("./controllers/courses.controller");
//CRUD => (CREATE  / READ / UPDATE / DELETE)  ON RES
//Route -> Rosources

//GET ALL COURSES
app.get("/api/courses", coursesController.getAllCourses);

// app.get("/api/courses/1", (req, res) => {
//   const course = courses.find(course => course.id == 1);
//   res.json(course);
// });

//GET SINGLE COURSE
app.get("/api/courses/:courseId", coursesController.getSingleCourse);

//CREATE NEW COURSE
app.post(
  "/api/courses",
  [
    body("title")
      .notEmpty()
      .withMessage("Title is Required!")
      .isLength({ min: 2 })
      .withMessage("Title is At least 2 Digits!"),
    body("price")
      .notEmpty()
      .withMessage("Price is Required!")
      .isLength({ min: 2 })
      .withMessage("Price is At least 2 Digits!")
  ],
  coursesController.addNewCourse
);

//UPDATE COURSE
app.patch("/api/courses/:courseId", coursesController.updateCourse);

//DELETE COURSE
app.delete("/api/courses/:courseId", coursesController.deleteCourse);

app.listen(port, () => {
  console.log(`Listening On Port: ${port}`);
});
