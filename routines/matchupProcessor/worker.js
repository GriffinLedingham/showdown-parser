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

const path              = require('path')
const processMatchup    = require('../processMatchup')
const WriteData         = require('../writeData')

module.exports = function() {
  // Running tally of completed logs
  let documentsProcessed = 0

  let workerData = []

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

      // Decide match outcome
      let outcome = false
      if (logData['log'].indexOf('|win|'+logData['p1']) != -1) {
        outcome = 'p1'
      } else if(logData['log'].indexOf('|win|'+logData['p2']) != -1) {
        outcome = 'p2'
      } else {
        outcome = 'tie'
      }

      processMatchup(logData, workerData, data.cutoff, outcome)

      // If this worker has completed all documents, exit
      if(data.filenames.length == documentsProcessed) {
        WriteData.matchup(data.cutoff,workerData)
        workerData = []
        process.send({txn:true})
      }
    })
  })
}
