#!/usr/bin/env node
/*Copyright 2022 and onwards Ravinder Olivier Singh Dadiala <ravinder-Olivier@outlook.com>.

 Licensed under the MIT License (the "License");
 you may not use this file except in compliance with the License.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';
import RSSParser from 'rss-parser';


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
      // Preferences Function
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
          process.exit()
        });
    }
  )
  .command(
    'check',
    'View Your feed',
    function (argv) {
    //RSS Function
    inquirer
    .prompt([
      {
        name: "feedUrl",
        type: "input",
        message: "Please go to your Github dashboard, right click on the subscribe to your rss feed link, and click copy link and paste it *without formatting artifacts*"
      }])
      .then((answer) => {
        const feedUrl = answer.feedUrl;
        
        const parse = async url => {
          const feed = await new RSSParser().parseURL(url);
          console.log(feed.title);
          feed.items.forEach(item => {
          console.log(`${item.title} - ${item.link}\n\n`);
        });
};
      console.log("Parsing " + feedUrl);

      parse(feedUrl);
        
  },)})
  .help()
  .demandCommand(1, "You need to use either 'check' or 'manage' to use Feeder")
  .argv