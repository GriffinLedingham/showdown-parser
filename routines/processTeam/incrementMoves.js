/**
 *
 * incrementMoves.js
 *
 * Increment move count in the provided master
 * data object
 *
 */

module.exports = function(moves, pokemonData) {
  moves.forEach((move)=>{
    if(pokemonData['moves'][move] != undefined) {
      pokemonData['moves'][move]++
    } else {
      pokemonData['moves'][move] = 1
    }
  })
}
