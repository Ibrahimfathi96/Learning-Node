const express = require("express");
const app = express();
const mongoose = require("mongoose");
const url =
  "mongodb+srv://ibmf796:nodejs_123@learn-mongo-db.p2rnxjy.mongodb.net/IBMF?retryWrites=true&w=majority";
mongoose.connect(url).then(() => {
  console.log("mongodb server started successfully");
});
app.use(express.json());
const port = 4000;

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.listen(port, () => {
  console.log(`Listening On Port: ${port}`);
});
