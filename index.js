const fs = require("node:fs");

//read file
// console.log("first");
// const fileContent = fs.readFileSync("./test.text", "utf-8");//Blocking Code, blocks here until file is read
// console.log("second");
//  console.log(`fileContent: ${fileContent}`);

fs.readFile("./test.text", "utf-8", (err, data) => {
  //Non Blocking Code
  err
    ? console.log("Error Raading Files", err)
    : console.log("File Content ==>", data);
});

//write to file
fs.writeFile(
  "./users.json",
  JSON.stringify([
    {
      id: 1,
      name: "Ibrahim",
    },
    {
      id: 2,
      name: "Mostafa",
    },
    {
      id: 3,
      name: "Dayhanna",
    },
  ]),
  "utf-8",
  (err) => {
    err ? console.log("Error Writing The file", err) : console.log("Done");
  }
);

//delete file
fs.unlink("./testdel.txt", (err) => {
  err ? console.log("Error Deleting the file", err) : console.log("Done");
});
