#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';


yargs(hideBin(process.argv))
  .command(
    'manage',
    'Manage Feeder-CLI Settings',
    function (yargs) {
      return yargs.option('m', {
        alias: 'update',
        describe: 'Manage Settings'
      })
    },
    function (argv) {
      console.log("Welcome to Feeder-CLI Preferences")

      inquirer
        .prompt([
          {
            name: "manageType",
            type: "list",
            message: chalk.underline("Scroll using arrow keys"),
            choices: ["Update RSS URL", "Change Display Options", "Other Preferences"]
          },
          {
            name: "rssUrlConfig",
            type: "input",
            message: "Please go to your Github dashboard, right click on the subscribe to your rss feed link, and click copy link and paste it *without formatting artifacts*",
            when: (answers) => answers.manageType === "Update RSS URL"
          },
          {
            name: "changeDisplayOptions",
            type: "list",
            message: "Change Display Options",
            choices: ["Change recentness of displayed events", "Change Descriptiveness of information displayed in Feed"],
            when: (answers) => answers.manageType === "Change Display Options",
          },
          {
            name: "otherPreferences",
            type: "list",
            message: "other Preferences",
            choices: ["Change recentness of displayed events", "Change Descriptiveness of information displayed in Feed"],
            when: (answers) => answers.manageType === "Other Preferences",
          },
        ])
        .then((answer) => {
          const manageType = answer.manageType;
          const rssUrlConfig = answer.rssUrlConfig;
          const changeDisplayoptions = answer.changeDisplayoptions;
          console.log("This part is still under development, thanks for using! Feeder-CLI is an open-source project, please consider contributing to keep us Feeding :)");
          console.log("This process will now exit shortly.");
          const doicont = false
          exit()
        });
    }
  )
  .command(
    'check',
    'View Your feed',
    function (yargs) {
      return yargs.option('m', {
        alias: 'view',
        describe: 'View your Feed'
      })
    },
    function (argv) {
	  var eventsnum = "error not made yet";
    // collect data for RSS Check


    console.log("You have", eventsnum, "Events today");



    console.log("*events*");
    process.exit()
    }
  )
  .help()
  .demandCommand(1, "You need to use either 'check' or 'manage' to use Feeder")
  .argv
  
/* PromptValue Based Code (to be migrated to inquirer based for esm compatibility)
console.log("Please type 'update' or 'check'");
     promptvalue = prompt("")
    if (promptvalue = "update") {
      console.log("Please go to your Github dashboard, right click on the subscribe to your rss feed link, and click copy link");
      console.log("Copy the link and paste it here **MAKE SURE THERE ARE NO FORMATTING ARTIFACTS**");
      const newrssurl = prompt("");
      //keytar 
      keytar.setPassword('Feeder-CLI', "github", newrssurl);
      const secret = keytar.getPassword('Feeder-CLI', 'github');
      console.log("Accepted");
      console.log("Will now exit, thank you for using Feeder-CLI");
      process.exit()
    }
    else if (promptvalue = "check") {
      console.log("Current RSS Feed Value is")
    }
    else {
      console.log("Sorry, Feeder-CLI has encountered a unknown error at line 40, else condition in yargs manage :(")
      console.log("The Program will exit shortly")
      process.exit()
}
*/