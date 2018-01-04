/**
 *
 * worker.js
 *
 * Worker thread that will iterate through logs, and process
 * the data, to be returned back to the master thread
 *
 * Once finished processing all logs, this thread will be
 * killed and cleaned up by master
 *
 */

const path          = require('path')
const processTeam   = require('../processTeam')

module.exports = function() {
  // Object the worker will store processed Pokemon data into
  let workerData = {}

  // Running tally of completed logs
  let documentsProcessed = 0

  // Handle message from master thread
  process.on('message', function(data) {
    data.filenames.forEach((filename) => {
      // Increment processed document count
      documentsProcessed++

      // Send a progress update every 100 files
      if(documentsProcessed%100 == 0) {
        process.send({txn:false,progress:100})
      }

      // Process the log file into Pokemon team data
      let logData = require(path.resolve(filename))
      processTeam(logData['p1team'], workerData)
      processTeam(logData['p2team'], workerData)

      // If this worker has completed all documents, exit
      if(data.filenames.length == documentsProcessed) {
        process.send({txn:true,data:workerData})
      }
    })
  })
}