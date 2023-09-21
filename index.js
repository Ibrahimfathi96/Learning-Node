const http = require("node:http");
const server = http.createServer((req, res) => {
  console.log("Request:", req.url);
  if (req.url == "/") {
    res.end("Home Page");
  } else if (req.url == "/about") {
    res.end("About Page");
  } else {
    res.end("Not Found Page");
  }
  res.end("Hello World!");
});
server.listen(3001, () => {
  console.log("Listening on port 3001");
});
