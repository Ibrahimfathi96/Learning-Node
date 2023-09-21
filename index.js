// import fs from "node:fs";
const fs = require("node:fs");
console.log("First");
// console.log("FileContent", fs.readFileSync("./test.txt", "utf-8"));

fs.readFile("./test.txt", "utf-8", (err, content) => {
  err
    ? console.error("Error Reading the file ==>", err)
    : console.log("fileContent:", content);
});//libvu ==> File I/O ==> Thread Pool ==> async operations / functions

console.log("Second");
