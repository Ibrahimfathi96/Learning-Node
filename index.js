const fs = require("node:fs");

//Streams [readable - writeable]
const rStream = fs.createReadStream("./test.txt", "utf-8");
const wStream = fs.createWriteStream("./readStreamOutput.txt", "utf-8");
rStream.on("data", (chunk) => {
  console.log("==================Chunk================", chunk);
  wStream.write("\n==================Chunk================\n");
  wStream.write(chunk);
});
