/**
 *
 * Showdown Usage Stats Parser
 *
 * This tool is built to parse raw data logs from Pokemon Showdown
 * into usage stat reports, and other interesting reports.
 *
 */

const cluster         = require('cluster')
const config          = require('./config')
const utils           = require('./utils')

global.Dex            = require('../Pokemon-Showdown/sim/dex')
global.Pokedex        = require('../Pokemon-Showdown/data/pokedex.js')

const WriteData       = require('./routines/writeData')
const LoadData        = require('./routines/loadData')
const UsageProcessor  = require('./routines/usageProcessor')
const MatchupProcessor  = require('./routines/matchupProcessor')

const formatData      = require('./routines/formatData')
const formatJSON      = require('./routines/formatJSON')
const [format, date, cutoff, output, skipLogs]  = args

if(skipLogs) {
  // Skip parsing logs, require the compiled data set to build
  // an output
  switch(output) {
    case 'usage':
      // Write formatted data to .txt
      WriteData.formatted(
        format,
        date,
        cutoff,
        formatData(
          LoadData.compiled(format,date,cutoff),
          LoadData.raw(format,date,cutoff)
        )
      )
      break
    case 'json':
      // Write formatted data to .json
      WriteData.JSON(
        format,
        date,
        cutoff,
        formatJSON(
          LoadData.compiled(format,date,cutoff),
          LoadData.raw(format,date,cutoff)
        )
      )
      break
  }
} else if(output == 'matchup') {
  // Main threading split occurs here. The initial running thread
  // will get master status, and spawn workers for each core the
  // app is being provided.
  if (cluster.isMaster) {
    MatchupProcessor.doMasterThread(format,date,cutoff,'pairs',cluster)
  } else {
    MatchupProcessor.doWorkerThread(cluster)
  }
} else if(output == 'teams') {
  // Main threading split occurs here. The initial running thread
  // will get master status, and spawn workers for each core the
  // app is being provided.
  if (cluster.isMaster) {
    MatchupProcessor.doMasterThread(format,date,cutoff,'team',cluster)
  } else {
    MatchupProcessor.doWorkerThread(cluster)
  }
} else {
  // Main threading split occurs here. The initial running thread
  // will get master status, and spawn workers for each core the
  // app is being provided.
  if (cluster.isMaster) {
    UsageProcessor.doMasterThread(format,date,cutoff,output,cluster)
  } else {
    UsageProcessor.doWorkerThread(cluster)
  }
}
