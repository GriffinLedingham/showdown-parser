/**
 *
 * incrementNature.js
 *
 * Increment nature count in the provided master
 * data object
 *
 */

module.exports = function(nature, evs, pokemonData, weight) {
  let evString = ''
  for(let ev in evs) {
    evString += evs[ev] + '/'
  }
  evString = evString.slice(0,-1)
  let outputNature = `${nature}:${evString}`
  if(pokemonData['nature'][outputNature] != undefined) {
    pokemonData['nature'][outputNature] += weight
  } else {
    pokemonData['nature'][outputNature] = weight
  }
}
