/**
 *
 * incrementNature.js
 *
 * Increment nature count in the provided master
 * data object
 *
 */

module.exports = function(nature, pokemonData) {
  if(pokemonData['nature'][nature] != undefined) {
    pokemonData['nature'][nature]++
  } else {
    pokemonData['nature'][nature] = 1
  }
}
