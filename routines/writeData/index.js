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

const jsonfile  = require('jsonfile')
const fs        = require('fs')

module.exports = {
  raw: function(format,date,data) {
    if(!fs.existsSync(`${AppConfig.rawDataDir}`)) {
      fs.mkdirSync(`${AppConfig.rawDataDir}`)
    }
    jsonfile.writeFileSync(`${AppConfig.rawDataDir}${format}-${date}-raw.json`, data)
  },
  compiled: function(format,date,data) {
    if(!fs.existsSync(`${AppConfig.compiledDataDir}`)) {
      fs.mkdirSync(`${AppConfig.compiledDataDir}`)
    }
    jsonfile.writeFileSync(`${AppConfig.compiledDataDir}${format}-${date}-compiled.json`, data)
  },
  formatted: function(format,date,string) {
    if(!fs.existsSync(`${AppConfig.formattedDataDir}`)) {
      fs.mkdirSync(`${AppConfig.formattedDataDir}`)
    }
    fs.writeFileSync(`${AppConfig.formattedDataDir}${format}-${date}-formatted.txt`, string)
  }
}
