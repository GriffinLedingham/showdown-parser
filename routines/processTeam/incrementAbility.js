/**
 *
 * incrementAbility.js
 *
 * Increment ability count in the provided master
 * data object
 *
 */

module.exports = function(ability, pokemonData, weight) {
  if(pokemonData['ability'][ability] != undefined) {
    pokemonData['ability'][ability] += weight
  } else {
    pokemonData['ability'][ability] = 1*weight
  }
}
