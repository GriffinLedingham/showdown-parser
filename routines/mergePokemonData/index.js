/**
 *
 * mergePokemonData
 *
 * Deep-combines two objects full of Pokemon data
 * pulled out of log files
 *
 * Any conflicts will be incremented, otherwise new
 * keys will simply be set to the main object
 *
 */

const _   = require('lodash')

module.exports = function(dataA, dataB) {
  // Iterate all Pokemom species keys in the object (B) to merge
  // into the main object (A)
  for(let key in dataB) {
    // A conflict exists, merge the Pokemon data from B into A
    if(dataA.hasOwnProperty(key)) {
      let pokemonItem = dataB[key]

      // Increment the total count of this species in this log set
      dataA[key]['count'] += pokemonItem['count']

      // Increment the total raw count of this species in this log set
      dataA[key]['raw_count'] += pokemonItem['raw_count']

      // Increment the viability value, this will need to be divided
      // by core count in compileData
      dataA[key]['viability'] += dataB[key]['viability']

      // Combine the avg_weight arrays
      dataA[key]['avg_weight'] = dataA[key]['avg_weight'].concat(dataB[key]['avg_weight'])

      // Iterate all moves, and merge them into existing data
      for(let move in pokemonItem.moves) {
        if(dataA[key]['moves'].hasOwnProperty(move)) {
          dataA[key]['moves'][move] += pokemonItem['moves'][move]
        } else {
          dataA[key]['moves'][move] = pokemonItem['moves'][move]
        }
      }

      // Iterate all abilities, and merge them into existing data
      for(let ability in pokemonItem.ability) {
        if(dataA[key]['ability'].hasOwnProperty(ability)) {
          dataA[key]['ability'][ability] += pokemonItem['ability'][ability]
        } else {
          dataA[key]['ability'][ability] = pokemonItem['ability'][ability]
        }
      }

      // Iterate all items, and merge them into existing data
      for(let item in pokemonItem.item) {
        if(dataA[key]['item'].hasOwnProperty(item)) {
          dataA[key]['item'][item] += pokemonItem['item'][item]
        } else {
          dataA[key]['item'][item] = pokemonItem['item'][item]
        }
      }

      // Iterate all natures, and merge them into existing data
      for(let nature in pokemonItem.nature) {
        if(dataA[key]['nature'].hasOwnProperty(nature)) {
          dataA[key]['nature'][nature] += pokemonItem['nature'][nature]
        } else {
          dataA[key]['nature'][nature] = pokemonItem['nature'][nature]
        }
      }

      // Iterate all teammates, and merge them into existing data
      for(let team in pokemonItem.team) {
        if(dataA[key]['team'].hasOwnProperty(team)) {
          dataA[key]['team'][team] += pokemonItem['team'][team]
        } else {
          dataA[key]['team'][team] = pokemonItem['team'][team]
        }
      }
    } else {
      // Simply set the species data from object B to A
      dataA[key] = dataB[key]
    }
  }
}
