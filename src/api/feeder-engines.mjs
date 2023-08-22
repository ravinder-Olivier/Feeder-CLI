// Feed Function

import * as keytar from 'keytar'
import * as parse from 'fast-rss-parser'
import RSSParser from 'rss-parser'
import reverseArray from 'reverse-array'
import c from 'ansi-colors'
export const fasterRss = async () => {
  const feedUrl = await keytar.getPassword('Feeder-CLI', 'github')

  return 'still under development'
}
export const rssengine = async () => {
  const log = console.log
  log(c.white("Here's your feed!"))
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

  ghfeed = c.white(ghfeed)
  return (ghfeed)
}
