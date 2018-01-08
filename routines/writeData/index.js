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
  raw: function(format,date,cutoff,data) {
    if(!fs.existsSync(`${AppConfig.rawDataDir}`)) {
      fs.mkdirSync(`${AppConfig.rawDataDir}`)
    }
    jsonfile.writeFileSync(`${AppConfig.rawDataDir}${format}-${date}-${cutoff}-raw.json`, data)
  },
  compiled: function(format,date,cutoff,data) {
    if(!fs.existsSync(`${AppConfig.compiledDataDir}`)) {
      fs.mkdirSync(`${AppConfig.compiledDataDir}`)
    }
    jsonfile.writeFileSync(`${AppConfig.compiledDataDir}${format}-${date}-${cutoff}-compiled.json`, data)
  },
  formatted: function(format,date,cutoff,string) {
    if(!fs.existsSync(`${AppConfig.formattedDataDir}`)) {
      fs.mkdirSync(`${AppConfig.formattedDataDir}`)
    }
    fs.writeFileSync(`${AppConfig.formattedDataDir}${format}-${date}-${cutoff}-formatted.txt`, string)
  },
  JSON: function(format,date,cutoff,data) {
    if(!fs.existsSync(`${AppConfig.JSONDataDir}`)) {
      fs.mkdirSync(`${AppConfig.JSONDataDir}`)
    }
    jsonfile.writeFileSync(`${AppConfig.JSONDataDir}${format}-${date}-${cutoff}-json.json`, data)
  },
  matchup: function(cutoff,data) {
    if(!fs.existsSync(`${AppConfig.matchupDataDir}`)) {
      fs.mkdirSync(`${AppConfig.matchupDataDir}`)
    }
    jsonfile.writeFileSync(`${AppConfig.matchupDataDir}matchup-${cutoff}-${Date.now()}.json`, data)
  }
}
