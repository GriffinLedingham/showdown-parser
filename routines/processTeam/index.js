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

let victoryChanceGXE  = require('./victoryChanceGXE')
let incrementAbility  = require('./incrementAbility')
let incrementNature   = require('./incrementNature')
let incrementMoves    = require('./incrementMoves')
let incrementItem     = require('./incrementItem')
let incrementTeam     = require('./incrementTeam')
let calculateWeight   = require('./calculateWeight')

module.exports = function(team, pokemonData, rating, cutoff, outcome) {
  // Calculate the pokemon's weighting based on player rating
  let weight = calculateWeight(rating, cutoff, outcome)

  for(let i = 0;i<team.length;i++) {
    let pokemonItem = team[i]

    // Lower case the species name, because there are multiple
    // versions of capitalization in the logs
    let species = pokemonItem['species'].toLowerCase().replace(/\-|\s/g,'')

    // If this Pokemon hasn't appeared yet, new usage stats entry for it
    if(pokemonData[species] == undefined) {
      initPokemon(species, pokemonData)
    }

    // Calculate the pokemon's GXE to see if it's a new high
    if(rating != undefined && rating.hasOwnProperty('rpr') && rating.hasOwnProperty('rprd')) {
      // Get the GXE for this trainer during current battle
      let gxe = Math.round(100*victoryChanceGXE(rating['rpr'], rating['rprd']))

      // If GXE is greater than pokemon's highest overwrite
      if(gxe > pokemonData[species]['viability']) {
        pokemonData[species]['viability'] = gxe
      }
    }

    // Increment total count of species
    pokemonData[species]['count'] += weight

    // Increment total raw count of species
    pokemonData[species]['raw_count']++

    // Add the team weight to be averaged for this pokemon
    pokemonData[species]['avg_weight'].push(weight)

    // Increment Moves Usage
    incrementMoves(pokemonItem['moves'], pokemonData[species], weight)

    // Increment Ability Usage
    incrementAbility(pokemonItem['ability'], pokemonData[species], weight)

    // Increment Nature/EV Usage
    incrementNature(pokemonItem['nature'], pokemonItem['evs'], pokemonData[species], weight)

    // Increment Item Usage
    incrementItem(pokemonItem['item'], pokemonData[species], weight)

    // Increment Team Usage
    incrementTeam(team, species, pokemonData[species], weight)
  }

  return weight
}

let initPokemon = function(species, pokemonData) {
  pokemonData[species] = {
    moves:{},
    ability:{},
    nature:{},
    item:{},
    team:{},
    avg_weight: [],
    viability: 0,
    raw_count: 0,
    count:0
  }
}
