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
const mergeTeamData     = require('../mergeTeamData')
const compileData       = require('../compileData')
const formatData        = require('../formatData')

const threads           = AppConfig.threads

module.exports = function(format, date, cutoff, report, cluster) {
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

  // Init the queue to be used for assembling data
  let dataQueue = new DataQueue()

  // Iterate all threads we want to send a worker to
  for (var t = 0; t < threads; t++) {
    // Create new process for log processing
    var worker = cluster.fork()

    // Handle message returning from worker
    worker.on('message', function(workerData) {
      // If the worker has finished processing
      if(workerData.txn) {
        if(report == 'team') {
          // Add processed data to queue to stitch later
          dataQueue.push(workerData.workerData)
        }

        //Kill worker thread
        this.destroy();
      }
      // Worker just has a progress update
      else {
        bar.tick(workerData.progress)
      }
    })

    // Dispatch the filenames for this worker to process
    worker.send({filenames:chunks[t], cutoff:cutoff, report: report})
  }

  cluster.on('exit', function(worker) {
    if (Object.keys(cluster.workers).length === 0) {
      // Stitch all data in queue, using mergeMatchupData()
      let matchupData
      if(report == 'pairs') {
        matchupData = dataQueue.stitchData(mergeMatchupData)
      } else if(report == 'team') {
        matchupData = dataQueue.stitchData(mergeTeamData)

        let outputArray = []
        for(let key in matchupData) {
          outputArray.push({
            team: key,
            wins: matchupData[key].wins,
            total: matchupData[key].total,
            winrate: 100*(matchupData[key].wins/matchupData[key].total)
          })
        }
        outputArray.sort(function(a, b) {
            return (b.wins) - (a.wins)
        })

        matchupData = outputArray
      }

      // Print elapsed operation time
      console.log('\n  Time elapsed: ' + ((new Date().getTime() - StartTS)/1000) + ' sec')

      if(report == 'pairs') {

      } else if(report == 'team') {
        WriteData.topTeams(format,date,cutoff,matchupData)
        console.log('  Matchup data written to: ' + `\n      ${AppConfig.topTeamDataDir}${format}-${date}-team.json`)
      }
      // Kill the master thread
      process.exit(1)
    }
  })
}
