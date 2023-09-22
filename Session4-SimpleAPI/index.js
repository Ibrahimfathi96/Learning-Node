const express = require("express");
const app = express();
app.use(express.json());
const port = 4000;

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.listen(port, () => {
  console.log(`Listening On Port: ${port}`);
});
