const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const AppError = require("../utils/appErrors");

//Route Handlers

const getAllCourses = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  console.log("query:", query);
  const limit = query.limit || 4;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    const err = AppError.create("Course not found!", 404, httpStatusText.FAIL);
    return next(err);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const addNewCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = AppError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = AppError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  const courseId = req.params.courseId;
  const updatedCourse = await Course.updateOne(
    { _id: courseId },
    { $set: { ...req.body } }
  );
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { course: updatedCourse }
  });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  updateCourse,
  deleteCourse
};
