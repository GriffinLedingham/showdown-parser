/**
 *
 * incrementAbility.js
 *
 * Increment ability count in the provided master
 * data object
 *
 */

module.exports = function(ability, pokemonData) {
  if(pokemonData['ability'][ability] != undefined) {
    pokemonData['ability'][ability]++
  } else {
    pokemonData['ability'][ability] = 1
  }
}
