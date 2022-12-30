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
// eslint-disable-next-line no-unused-vars
const prompt = require('prompt')
const RSSParser = require('rss-parser')
const keytar = require('keytar')
const log = console.log
const inquirer = require('inquirer')
const reverseArray = require('reverse-array')
const fs = require('fs')
const feeder = require('./feeder-functions.cjs')

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
            name: 'changeDisplayOptions',
            type: 'list',
            message: 'Change Display Options',
            choices: [
              'Change recentness of displayed events',
              'Change Descriptiveness of information displayed in Feed'
            ],
            when: (answers) => answers.manageType === 'Change Display Options'
          }
        ])
        .then(async (answer) => {
          // This part is ran after the inquirer prompts
          const manageType = answer.manageType
          const changeDisplayoptions = answer.changeDisplayoptions
          log(
            'This part is still under development, thanks for using! Feeder-CLI is an', chalk.underline('open-source project'), ', please consider contributing to keep us Feeding :)'
          )
          if (manageType === 'Update RSS URL') {
            log(
              'Please go to your Github dashboard, right click on the subscribe to your rss feed link address, and click copy link and paste it *without formatting artifacts*'
            )
            prompt.start()
            const { FeedURL, confirmation } = await prompt.get(['FeedURL', 'confirmation'])
            if (confirmation === 'y') {
              keytar.setPassword('Feeder=CLI', 'github', FeedURL)
            } else {
              log('Error, you typed', FeedURL, 'Please use y or n only!')
              log('Process will soon exit. Thanks for using Feeder-CLI')
              process.exit()
            }
          } else if (manageType === '') {
            log('This process will exit soon')
            process.exit()
          }
        })
    }
  )
  .command(
    'check',
    'View Your feed',
    function (yargs) {
      return yargs.option('m', {
        alias: 'check',
        describe: 'Check your feed'
      })
    },
    async function () {
      // calls the feeder-functions file to get the feed
      log(await feeder.getfeed())
    }
  )
  .help()
  .demandCommand(
    1,
    "You need to use either 'check' or 'manage' to use Feeder-CLI"
  ).argv
