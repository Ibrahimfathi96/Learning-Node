// import fs from "node:fs";
const crypto = require("node:crypto");
process.env.UV_THREADPOOL_SIZE = 5;
const start = performance.now();

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
  console.log("End of PBKDF2 in ms", performance.now() - start);
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
  console.log("End of PBKDF2 in ms", performance.now() - start);
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
  console.log("End of PBKDF2 in ms", performance.now() - start);
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
  console.log("End of PBKDF2 in ms", performance.now() - start);
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
  //No.5 will have larger time because the default size is 4 only but there's a sol. process.env.UV_THREADPOOL_SIZE = 5;
  console.log("End of PBKDF2 in ms", performance.now() - start);
});

// crypto.pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
// console.log("End of PBKDF2 in ms", performance.now() - start);

// crypto.pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
// console.log("End of PBKDF2 in ms", performance.now() - start);
