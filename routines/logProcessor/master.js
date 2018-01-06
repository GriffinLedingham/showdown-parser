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
const formatData        = require('../formatData')

const cores             = AppConfig.cores

module.exports = function(format, date, cutoff, output, cluster) {
  // Get all filenames to be parsed
  let filenames = readLogs(format, date)

  // Weighted total team count of all teams
  let teamCount = 0

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

        // Add weighted team count to total
        teamCount += workerData.teamCount

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
      // Stitch all data in queue, using mergePokemonData()
      let rawData = dataQueue.stitchData(mergePokemonData)

      // Write raw data to .json
      WriteData.raw(format,date,cutoff,rawData)

      // Compile the raw data into usage stats
      let compiledData = compileData(rawData, teamCount)

      // Write compiled data to .json
      WriteData.compiled(format,date,cutoff,compiledData)

      switch(output) {
        case 'usage':
          // Write formatted data to .txt
          WriteData.formatted(format,date,cutoff,formatData(compiledData, rawData))
          break;
        case 'json':
          WriteData.json(format,date,cutoff,formatJSON(compiledData, rawData))
          break;
      }

      // Print elapsed operation time
      console.log('\n  Time elapsed: ' + ((new Date().getTime() - StartTS)/1000) + ' sec')
      console.log('  Teams Processed: ' + teamCount)
      console.log('  Raw data written to: ' + `\n      ${AppConfig.rawDataDir}${format}-${date}-raw.json`)
      console.log('  Compiled data written to: ' + `\n      ${AppConfig.compiledDataDir}${format}-${date}-compiled.json`)
      console.log('  Formatted data written to: ' + `\n      ${AppConfig.formattedDataDir}${format}-${date}-formatted.txt`)
      // Kill the master thread
      process.exit(1)
    }
  })
}
