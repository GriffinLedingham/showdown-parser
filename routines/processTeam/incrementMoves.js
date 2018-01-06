/**
 *
 * incrementMoves.js
 *
 * Increment move count in the provided master
 * data object
 *
 */

module.exports = function(moves, pokemonData, weight) {
  moves.forEach((move)=>{
    if(pokemonData['moves'][move] != undefined) {
      pokemonData['moves'][move] += weight
    } else {
      pokemonData['moves'][move] = weight
    }
  })
}
