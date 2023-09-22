const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

// //LOCAL WITHOUT DB
// let { courses } = require("../data/courses");

//Route Handlers
const getAllCourses = async (req, res) => {
  //getAllCourses from DB using Course model
  const courses = await Course.find();
  console.log("Courses", courses);
  res.json(courses);
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ code: 404, msg: "Course not found!" });
    }
    res.json(course);
  } catch (err) {
    return res.status(400).json({ code: 400, msg: "Invalid Object ID!" });
  }
};

const addNewCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      {
        $set: { ...req.body }
      }
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    return res.status(400).json({ errorMsg: err });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const data = await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json({ success: true, msg: data });
  } catch (err) {
    return res.status(400).json({ errorMsg: err });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  updateCourse,
  deleteCourse
};
