'use strict'
const getfeed = async () => {
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
  feedarray.push(feed.title)
  await feed.items.forEach((item) => {
    feedarray.push(`${item.title} - ${item.link}`)
    feedarray.push('')
  })
  const ghfeed = (reverseArray(feedarray))
  return (ghfeed)
}
function simplequirer () {

}

exports.getfeed = getfeed
exports.simplequirer = simplequirer
