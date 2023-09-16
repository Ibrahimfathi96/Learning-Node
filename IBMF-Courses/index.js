#!/usr/bin/env node

//steps to upload npm package
//npm login
//npm publish

import { Command } from "commander";
const program = new Command();
import fs from "fs";
import inquirer from "inquirer";
const questions = [
  {
    type: "input",
    name: "title",
    message: "please enter a course title.",
  },
  {
    type: "number",
    name: "price",
    message: "please enter a course price.",
  },
];
const filePath = "./courses.json";

program
  .name("IBMF-Courses-manger")
  .description("CLI to manage courses")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("add a course")
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      console.log(answers);
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, "utf-8", (err, fileContent) => {
          if (err) {
            console.log("Error Reading the file", err);
            process.exit();
          }
          console.log("fileContent ==>", fileContent);
          const fileContentAsJson = JSON.parse(fileContent);
          fileContentAsJson.push(answers);
          fs.writeFile(
            filePath,
            JSON.stringify(fileContentAsJson),
            "utf-8",
            () => {
              console.log("Add courses Done");
            }
          );
        });
      } else {
        fs.writeFile(filePath, JSON.stringify([answers]), "utf-8", () => {
          console.log("Add courses Done");
        });
      }
    });
  });
program
  .command("list")
  .alias("l")
  .description("list all course")
  .action(() => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        console.log("Error Reading the file==>", err);
        process.exit();
      } else {
        console.table(JSON.parse(content));
      }
    });
  });
program.parse(process.argv);
