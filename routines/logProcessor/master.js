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
const mergePokemonData  = require('../mergePokemonData')
const compileData       = require('../compileData')

const cores             = AppConfig.cores

module.exports = function(format, date, cluster) {
  // Get all filenames to be parsed
  let filenames = readLogs(format, date)

  // Init progress bar
  let bar = new ProgressBar(filenames.length)

  // Break up the files for each available thread
  let chunks = [filenames]
  if(cores > 1) {
    chunks = chunkArray(filenames,Math.ceil(filenames.length/cores))
  }

  // Start the timer after filename processing is completed
  const StartTS = new Date().getTime()

  // Init the queue to be used for assembling data
  let dataQueue = new DataQueue()

  // Iterate all cores we want to send a worker to
  for (var t = 0; t < cores; t++) {
    // Create new process for log processing
    var worker = cluster.fork()

    // Handle message returning from worker
    worker.on('message', function(workerData) {
      // If the worker has finished processing
      if(workerData.txn) {
        // Add completed raw data to queue for stitching
        dataQueue.push(workerData.data)

        //Kill worker thread
        this.destroy();
      }
      // Worker just has a progress update
      else {
        bar.tick(workerData.progress)
      }
    })

    // Dispatch the filenames for this worker to process
    worker.send({filenames:chunks[t]})
  }

  cluster.on('exit', function(worker) {
    if (Object.keys(cluster.workers).length === 0) {
      // Stitch all data in queue, using mergePokemonData()
      let rawData = dataQueue.stitchData(mergePokemonData)

      // Write raw data to .json
      WriteData.raw(format,date,rawData)

      // Compile the raw data into usage stats
      let compiledData = compileData(rawData)

      //Write compiled data to .json
      WriteData.compiled(format,date,compiledData)

      // Print elapsed operation time
      console.log('\nTime elapsed: ' + ((new Date().getTime() - StartTS)/1000) + ' sec')

      // Kill the master thread
      process.exit(1)
    }
  })
}
