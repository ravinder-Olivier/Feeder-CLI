const getFeed = async () => {
    const engines = require("./feeder-engines.cjs")
    const jsonparser = require("edit-json-file")
    let file = jsonparser(`$../feeder-settings.json`)

        const feed = await engines.rssengine()
    return await feed
}
const engineManagement = async () => {

}
exports.getFeed = getFeed
exports.engineManagement = engineManagement