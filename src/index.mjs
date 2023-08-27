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
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import prompt from 'prompt'
import c from 'ansi-colors'
import inquirer from 'inquirer'
import * as fs from 'fs'
import * as feeder from './api/feeder-functions.mjs'
import * as keytar from 'keytar'
import RSSParser from 'rss-parser'
const argv = yargs(hideBin(process.argv)).argv
const log = console.log

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
            message: c.underline('Scroll using arrow keys'),
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
          },
          {
            name: 'otherPreferences',
            type: 'list',
            message: 'Other Preferences',
            choices: [
              'Change RSS Engine',
              ''
            ],
            when: (answers) => answers.manageType === 'Other Preferences'
          }
        ])
        .then(async (answer) => {
          // This part is ran after the inquirer prompts
          log(
            'This part is still under development, thanks for using! Feeder-CLI is an', c.underline('open-source project'), ', please consider contributing to keep us Feeding :)'
          )
          if (answer.manageType === 'Update RSS URL') {
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
          } else if (answer.manageType === 'Other Preferences') {
            if (answer.otherPreferences === 'Change RSS Engine') {
              log('', "This part hasn't been developed yet", '\n', 'This process will exit soon')
              process.exit()
            }
          } else {
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
    // calls feeder functions file
    async function () { log(await feeder.getFeed()) }
  )
  .help()
  .demandCommand(
    1,
    "You need to use either 'check' or 'manage' to use Feeder-CLI"
  ).argv
