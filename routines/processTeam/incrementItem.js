/**
 *
 * incrementItem.js
 *
 * Increment item count in the provided master
 * data object
 *
 */

module.exports = function(item, pokemonData, weight) {
  // Disable for replay parsing
  if(pokemonData['item'][item] != undefined) {
    pokemonData['item'][item] += weight
  } else {
    pokemonData['item'][item] = 1*weight
  }
}
