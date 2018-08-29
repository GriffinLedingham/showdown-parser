/**
 *
 * mergeTeamData
 *
 * Combine arrays of matchup teams, straight array
 * combination
 *
 * Duplicates are totally fine, this is simply an
 * array of objects
 *
 */

const _   = require('lodash')

module.exports = function(dataA, dataB) {
  // Iterate all team keys in the object (B) to merge
  // into the main object (A)
  for(let key in dataB) {
    // A conflict exists, merge the team data from B into A
    if(dataA.hasOwnProperty(key)) {
      dataA[key].wins += dataB[key].wins
      dataA[key].total += dataB[key].total
    } else {
      // Simply set the team data from object B to A
      dataA[key] = dataB[key]
    }
  }

  return dataA
}
