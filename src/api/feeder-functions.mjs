/* eslint-disable  */
import * as engines from './feeder-engines.mjs'
import config from './feeder-settings.json' assert { type: "json" }
export const getFeed = async () => {
  if (config.engine == 'default') {
    const feed = await engines.rssengine()
    return await feed
  }
}
export const engineManagement = async () => {
    return 'not built yet'
}