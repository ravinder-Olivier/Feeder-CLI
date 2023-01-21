// Feed Function
const inquirer = require("inquirer");
const chalk = require("chalk");
const prompt = require("prompt");
const keytar = require("keytar");
const {hideBin} = require("yargs/helpers");
const getfeed = async () => {

}
const rssengine = async () => {
  const chalk = require('chalk')
  const RSSParser = require('rss-parser')
  const keytar = require('keytar')
  const log = console.log
  const reverseArray = require('reverse-array')
  log(chalk.white("Here's your feed!"))
  // below async function below gets the keytar password, if there's no password present the program will error at the getfeed function
  const feedUrl = await keytar.getPassword('Feeder-CLI', 'github')
  const feed = await new RSSParser().parseURL(feedUrl)
  // If it's just logged then it'll be backwards, but to get it in order we have to make an array and then reverses it, then log it
  // eslint-disable-next-line prefer-const
  let feedarray = []
  await feed.items.forEach((item) => {
    feedarray.push(`${item.title} ~ ${item.link}`)
    feedarray.push('\n', '\n')
  })
  let ghfeed = (reverseArray(feedarray))
  ghfeed = ghfeed.toString()

  // commas are artifact of the array to string conversion
  ghfeed = ghfeed.replaceAll(',', '')

  ghfeed = chalk.white(ghfeed)
  return (ghfeed)
}
exports.getfeed = getfeed
exports.rssengine = rssengine