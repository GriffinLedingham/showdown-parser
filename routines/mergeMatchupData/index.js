/**
 *
 * mergeMatchupData
 *
 * Combine arrays of matchup pairs, straight array
 * combination
 *
 * Duplicates are totally fine, this is simply an
 * array of objects
 *
 */

const _   = require('lodash')

module.exports = function(dataA, dataB) {
  if(Object.keys(dataA).length == 0)
    dataA = dataB
  else
    dataA = dataA.concat(dataB)
  return dataA
}
