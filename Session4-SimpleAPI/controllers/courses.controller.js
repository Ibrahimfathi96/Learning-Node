let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
//Route Handlers

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getSingleCourse = (req, res) => {
  // console.log(req.params);//==> courseId:id
  // console.log(req.params.courseId); //==> id
  const courseId = +req.params.courseId;
  const course = courses.find(course => course.id === courseId);
  if (!course) {
    return res.status(404).json({ code: 404, msg: "course not found!" });
  }
  res.json(course);
};
const addNewCourse = (req, res) => {
  //...handlers ==> Function()=>Function(), Middlewares
  // console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  // console.log("ValidationErrors==>", errors);

  const course = {
    id: courses.length + 1,
    ...req.body
  };
  courses.push(course);

  // if (!req.body.title) {
  //   return res
  //     .status(400)
  //     .json({ code: 400, msg: "Title are not Provided!" });
  // } else if (!req.body.price) {
  //   return res
  //     .status(400)
  //     .json({ code: 400, msg: "Price are not Provided!" });
  // }

  res.status(201).json(course);
};

const updateCourse = (req, res) => {
  const id = +req.params.courseId;
  let course = courses.find(course => course.id === id);
  if (!course) {
    return res.status(404).json({ code: 404, msg: "course not found!" });
  }
  course = { ...course, ...req.body };
  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const id = +req.params.courseId;
  let coursesList = courses.filter(course => course.id != id);
  res.status(200).json([{ success: "true" }, coursesList]);
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  updateCourse,
  deleteCourse
};
