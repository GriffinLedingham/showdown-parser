/**
 *
 * incrementTeam.js
 *
 * Increment team count in the provided master
 * data object
 *
 */

module.exports = function(team, species, pokemonData) {
  for(let i = 0;i<team.length;i++) {
    let teamMon = team[i]['species'].toLowerCase().replace(/\-|\s/g,'')
    if(species.toLowerCase().replace(/\-|\s/g,'') == teamMon)
      continue
    let pokemon = teamMon
    if(pokemonData['team'][pokemon] != undefined) {
      pokemonData['team'][pokemon]++
    } else {
      pokemonData['team'][pokemon] = 1
    }
  }
}
