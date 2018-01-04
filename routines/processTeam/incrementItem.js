/**
 *
 * incrementItem.js
 *
 * Increment item count in the provided master
 * data object
 *
 */

module.exports = function(item, pokemonData) {
  if(pokemonData['item'][item] != undefined) {
    pokemonData['item'][item]++
  } else {
    pokemonData['item'][item] = 1
  }
}
