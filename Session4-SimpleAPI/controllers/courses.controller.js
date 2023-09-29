const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");

//Route Handlers
const getAllCourses = async (req, res) => {
  const courses = await Course.find({}, { __v: false });
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "Course not found!" }
      });
    }
    return res.json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err) {
    return res.status(400).json({
      code: 400,
      status: httpStatusText.ERROR,
      data: null,
      msg: err.message
    });
  }
};

const addNewCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
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
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course: updatedCourse }
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  updateCourse,
  deleteCourse
};
