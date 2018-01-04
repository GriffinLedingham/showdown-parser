/**
 *
 * readLogs
 *
 * Iterate the provided directory structure, and grab all log
 * filenames for the input format and date. Combine them all
 * into a single array to be returned, and chunked by the master
 * processor thread
 *
 */

const days    = AppConfig.days
const fs      = require('fs')

module.exports = function(format, date) {
  let filePath = `${AppConfig.baseFilePath}${format}-${date}/${date}-`
  let allFiles = []

  for(let y in days) {
    if(!fs.existsSync(filePath+days[y])) {
      console.log(filePath+days[y])
      continue
    }
    let tempFiles = fs.readdirSync(filePath+days[y])
    for(let z in tempFiles) {
      allFiles.push(filePath+days[y] + '/' + tempFiles[z])
    }
  }

  return allFiles
}
