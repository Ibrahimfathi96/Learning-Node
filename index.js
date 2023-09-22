const http = require("node:http");
const fs = require("node:fs");
const homePage = fs.readFileSync("./views/index.html", "utf-8");
const cssFile = fs.readFileSync("./views/styles.css", "utf-8");

const server = http.createServer((req, res) => {
  console.log("========== req.url ============");
  console.log(req.url);
  if (req.url === "/") {
    res.write(homePage);
  } else if (req.url === "/about") {
    res.write("<h1>About Page</h1>");
  } else if (req.url === "/styles.css") {
    res.write(cssFile);
  } else {
    res.statusCode = 404;
    res.write("<h1>Not Found Page 404</h1>");
  }
  res.end();
});

server.listen(8000, "localhost", () => {
  console.log("Listening on Port: 8000");
});
