#!/usr/bin/env node
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* Copyright 2022 and onwards Ravinder Olivier Singh Dadiala <ravinder-Olivier@outlook.com>.

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

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const chalk = require('chalk')
const inquirer = require('inquirer')
// eslint-disable-next-line no-unused-vars
const prompt = require('prompt')
const RSSParser = require('rss-parser')
const keytar = require('keytar')
const log = console.log;

// Yargs is used, only yargs commands will execute, ex] feeder manage, or feeder check, not using an option will result in the options listed rather then any function




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
      // This is the manage function, all the code for manage lives in these brace brackets
      console.log('Welcome to Feeder-CLI Preferences')
      // Following is an inquirer prompt, which gets users selected options
      inquirer
        .prompt([
          {
            name: 'manageType',
            type: 'list',
            message: chalk.underline('Scroll using arrow keys'),
            choices: [
              'Update RSS URL',
              'Change Display Options',
              'Other Preferences'
            ]
          },
          {
            name: 'rssUrlConfig',
            type: 'input',
            message:
              'Please go to your Github dashboard, right click on the subscribe to your rss feed link, and click copy link and paste it *without formatting artifacts*',
            when: (answers) => answers.manageType === 'Update RSS URL'
          },
          {
            name: 'changeDisplayOptions',
            type: 'list',
            message: 'Change Display Options',
            choices: [
              'Change recentness of displayed events',
              'Change Descriptiveness of information displayed in Feed'
            ],
            when: (answers) => answers.manageType === 'Change Display Options'
          },
          {
            name: 'otherPreferences',
            type: 'list',
            message: 'other Preferences',
            choices: [
              'Change recentness of displayed events',
              'Change Descriptiveness of information displayed in Feed'
            ],
            when: (answers) => answers.manageType === 'Other Preferences'
          }
        ])
        .then(async (answer) => {
	  // This part is ran after the inquirer prompts
          const manageType = answer.manageType
          const rssUrlConfig = answer.rssUrlConfig
          const changeDisplayoptions = answer.changeDisplayoptions
          console.log(
            'This part is still under development, thanks for using! Feeder-CLI is an', chalk.underline('open-source project'), ', please consider contributing to keep us Feeding :)'
          )
          console.log(chalk.italic('This process will now exit shortly.'))
          if (manageType === 'rssUrlConfig') {
            console.log(
              'Please go to your Github dashboard, right click on the subscribe to your rss feed link address, and click copy link and paste it *without formatting artifacts*'
            )
            prompt.start()
            prompt.get(['fdurl'])
            const fdurl = await prompt.get('fdurl')
            console.log('You entered', fdurl, 'Should this be saved? y or n')
            prompt.start()
            prompt.get(['confirmationrss'])
            const confirmationrss = await prompt.get('confirmationrss')
            if (confirmationrss === 'y') {
              // keytar save
            } else {
              console.log('This feature has not been developed yet, sorry!')
              console.log('Thanks for using Feeder-CLI')
              process.exit()
            }
          }
        })
    }
  )
  .command(
    'check',
    'View Your feed',

    function () {
      // RSS Function
      async function getfeed () {
        console.log("Here's your feed!")
        // below async function below gets the keytar password, if there's no password present the program will error at the getfeed function
        const feedUrl = await keytar.getPassword('Feeder-CLI', 'github')
        const feed = await new RSSParser().parseURL(feedUrl)
        console.log(feed.title)
        feed.items.forEach((item) => {
          console.log(`${item.title} - ${item.link}\n\n`)
        })
      }
      getfeed()
    }
  )
  .help()
  .demandCommand(
    1,
    "You need to use either 'check' or 'manage' to use Feeder-CLI"
  ).argv
