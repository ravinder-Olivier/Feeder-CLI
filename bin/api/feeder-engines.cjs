// Feed Function

const keytar = require("keytar");
const {parse} = require("fast-rss-parser");
const RSSParser = require("rss-parser");
const fasterRss = async () => {

return 'still under development'
}
const rssengine = async () => {
  const chalk = require('chalk')
  const RSSParser = require('rss-parser')
  const log = console.log
  const reverseArray = require('reverse-array')
  const inquirer = require("inquirer");
  const keytar = require("keytar");

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

exports.fasterRss = fasterRss
exports.rssengine = rssengine