/**
 *
 * writeData
 *
 * Simple singleton object to be used for data writes, just
 * to keep data writing contained to a single place in the app.
 *
 * Preprocessing of the data can happen in here, based on which
 * type of write is being requested (raw, compiled, etc)
 *
 */

const jsonfile = require('jsonfile')

module.exports = {
  raw: function(format,date,data) {
    jsonfile.writeFileSync(`${AppConfig.rawDataDir}${format}-${date}-raw.json`, data)
  },
  compiled: function(format,date,data) {
    jsonfile.writeFileSync(`${AppConfig.compiledDataDir}${format}-${date}-compiled.json`, data)
  }
}
