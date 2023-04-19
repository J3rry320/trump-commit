#!/usr/bin/env node

const { exec } = require("child_process");
const { program } = require("commander");

const { commitMessages } = require("./config");

program
  .description(
    "Generate the greatest commit message from a list of the best messages and commit all code to make your codebase tremendous."
  )
  .helpOption("-h, --help", "Display help for command")
  .option("-m, --message <message>", "Specify a custom commit message")
  .action((options) => {
    const { message } = options;

    if (message) {
      commitCode(message);
    } else {
      commitCode(
        commitMessages[Math.floor(Math.random() * commitMessages.length)]
      );
    }
  });

const commitCode = (message) => {
  exec(`git add . && git commit -m "${message}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed to commit code with error: ${error}`);
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Successfully committed code with message: ${message}`);
    console.log(
      `Thank you for using Trump Commit. Your codebase is tremendous.`
    );
  });
};

program.parse(process.argv);
