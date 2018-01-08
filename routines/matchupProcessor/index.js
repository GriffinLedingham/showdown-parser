/**
 *
 * matchupProcessor
 *
 * The main log parser logic, split up between a master
 * thread, and multi-threaded children to split work of
 * processing the logs
 *
 */

module.exports = {
  doMasterThread: require('./master'),
  doWorkerThread: require('./worker')
}
