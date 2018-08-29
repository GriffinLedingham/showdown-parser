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
const processTopTeams   = require('../processTopTeams')
const WriteData         = require('../writeData')

module.exports = function() {
  // Running tally of completed logs
  let documentsProcessed = 0

  let workerData = []

  // Handle message from master thread
  process.on('message', function(data) {
    if(data.report == 'team')
      workerData = {}

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

      if(data.report == 'pairs') {
        processMatchup(logData, workerData, data.cutoff, outcome)
      } else if(data.report == 'team') {
        processTopTeams(logData, workerData, data.cutoff, outcome)
      }

      // logData['log'] = undefined
      // logData['p1'] = undefined
      // logData['p2'] = undefined
      // logData['p1rating'] = undefined
      // logData['p2rating'] = undefined
      // logData['p1team'] = undefined
      // logData['p2team'] = undefined
      // delete logData['log']
      // delete logData['p1']
      // delete logData['p2']
      // delete logData['p1rating']
      // delete logData['p2rating']
      // delete logData['p1team']
      // delete logData['p2team']
      //
      // logData = undefined
      // delete logData
      //
      // global.gc()

      // If this worker has completed all documents, exit
      if(data.filenames.length == documentsProcessed) {
        process.send({txn:true,workerData:workerData})
      }
    })
  })
}
