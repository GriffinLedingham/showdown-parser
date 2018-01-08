/**
 *
 * master.js
 *
 * Master thread that will spawn children to process logs
 *
 * Children will be created based on core provided, and will
 * split up the log files evenly
 *
 */

const WriteData         = require('../writeData')

const readLogs          = require('../readLogs')
const mergeMatchupData  = require('../mergeMatchupData')
const compileData       = require('../compileData')
const formatData        = require('../formatData')

const threads           = AppConfig.threads

module.exports = function(format, date, cutoff, cluster) {
  // Get all filenames to be parsed
  let filenames = readLogs(format, date)

  // Init progress bar
  let bar = new ProgressBar(filenames.length)

  // Break up the files for each available thread
  let chunks = [filenames]
  if(threads > 1) {
    chunks = chunkArray(filenames,Math.ceil(filenames.length/threads))
  }

  // Start the timer after filename processing is completed
  const StartTS = new Date().getTime()

  // Iterate all threads we want to send a worker to
  for (var t = 0; t < threads; t++) {
    // Create new process for log processing
    var worker = cluster.fork()

    // Handle message returning from worker
    worker.on('message', function(workerData) {
      // If the worker has finished processing
      if(workerData.txn) {
        //Kill worker thread
        this.destroy();
      }
      // Worker just has a progress update
      else {
        bar.tick(workerData.progress)
      }
    })

    // Dispatch the filenames for this worker to process
    worker.send({filenames:chunks[t], cutoff:cutoff})
  }

  cluster.on('exit', function(worker) {
    if (Object.keys(cluster.workers).length === 0) {
      // Stitch all data in queue, using mergeMatchupData()
      // let matchupData = dataQueue.stitchData(mergeMatchupData)

      // Print elapsed operation time
      console.log('\n  Time elapsed: ' + ((new Date().getTime() - StartTS)/1000) + ' sec')
      console.log('  Matchup data written to: ' + `\n      ${AppConfig.matchupDataDir}${format}-${date}-matchup-1.json`)
      // Kill the master thread
      process.exit(1)
    }
  })
}
