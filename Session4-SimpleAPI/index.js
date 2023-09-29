require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("mongodb server started successfully");
});

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

//Global Middleware for not found routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This resource does not exist!"
  });
});

//Global Error Handler
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    code: error.statusCode || 500,
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    data: null
  });
});

app.listen(port, () => {
  console.log(`Listening On Port: ${port}`);
});
