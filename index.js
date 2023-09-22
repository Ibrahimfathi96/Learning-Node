const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");

// app.use(express.static("./views"));
app.use((req, res, next) => {
  //middleware .. could be added to specific route app.use('/here',())
  console.log("MIDDLEWARE 1");
  console.log("METHOD:", req.method, "URL:", req.url);
  next();
});
app.use((req, res, next) => {
  console.log("MIDDLEWARE 2");
  next();
});
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Welcome to express web framework!");
});

app.get("/about", (req, res) => {
  res.send("Hello From About Page!");
});

app.get("/home", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/product", (req, res) => {
  res.send([
    {
      id: 1,
      title: "product1"
    },
    {
      id: 2,
      title: "product2"
    },
    {
      id: 3,
      title: "product3"
    }
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
