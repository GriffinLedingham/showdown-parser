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

const LogProcessor    = require('./routines/logProcessor')
const [format, date]  = args

// Main threading split occurs here. The initial running thread
// will get master status, and spawn workers for each core the
// app is being provided.
if (cluster.isMaster) {
  LogProcessor.doMasterThread(format,date,cluster)
} else {
  LogProcessor.doWorkerThread(cluster)
}
