/**
 *
 * loadData
 *
 * Simple singleton object to be used for data loads, just
 * to keep data loading contained to a single place in the app.
 *
 * Preprocessing of the data can happen in here, based on which
 * type of load is being requested (raw, compiled, etc)
 *
 */

const fs        = require('fs')

module.exports = {
  raw: function(format,date,cutoff) {
    if(!fs.existsSync(`${AppConfig.rawDataDir}`)) {
      fs.mkdirSync(`${AppConfig.rawDataDir}`)
    }
    return require(`../../${AppConfig.rawDataDir}${format}-${date}-${cutoff}-raw.json`)
  },
  compiled: function(format,date,cutoff) {
    if(!fs.existsSync(`${AppConfig.compiledDataDir}`)) {
      fs.mkdirSync(`${AppConfig.compiledDataDir}`)
    }
    return require(`../../${AppConfig.compiledDataDir}/${format}-${date}-${cutoff}-compiled.json`)
  }
}
