/**
 *
 * processTeam
 *
 * Iterate over provided team from a log file. This
 * function is called from a LogProcessor worker,
 * and is expected to write its data to the worker's
 * master data object
 *
 * Currently this only handles moves, abilities, items,
 * and natures. This is where teammate data will be processed
 * in future, as well as ev's
 *
 */

let incrementAbility  = require('./incrementAbility')
let incrementNature   = require('./incrementNature')
let incrementMoves    = require('./incrementMoves')
let incrementItem     = require('./incrementItem')
let incrementTeam     = require('./incrementTeam')

module.exports = function(team, pokemonData) {
  for(let i = 0;i<team.length;i++) {
    let pokemonItem = team[i]

    // Lower case the species name, because there are multiple
    // versions of capitalization in the logs
    let species = pokemonItem['species'].toLowerCase().replace(/\-|\s/g,'')

    // If this Pokemon hasn't appeared yet, new usage stats entry for it
    if(pokemonData[species] == undefined) {
      initPokemon(species, pokemonData)
    }

    // Increment total count of species
    pokemonData[species]['count']++

    // Increment Moves Usage
    incrementMoves(pokemonItem['moves'], pokemonData[species])

    // Increment Ability Usage
    incrementAbility(pokemonItem['ability'], pokemonData[species])

    // Increment Nature Usage
    incrementNature(pokemonItem['nature'], pokemonData[species])

    // Increment Item Usage
    incrementItem(pokemonItem['item'], pokemonData[species])

    // Increment Team Usage
    incrementTeam(team, species, pokemonData[species])
  }
}

let initPokemon = function(species, pokemonData) {
  pokemonData[species] = {
    moves:{},
    ability:{},
    nature:{},
    item:{},
    team:{},
    count:0
  }
}
