/**
 *
 * formatJSON
 *
 * This will output the compiled data into a JSON format,
 * similar to Smogon's chaos data sets. This will be limited
 * in output, as it is meant mostly to be used with Pikalytics.
 *
 */

// This expects Pokemon-Showdown to be cloned at the directory below
// https://github.com/Zarel/Pokemon-Showdown
const Dex = require('../../../Pokemon-Showdown/sim/dex')

module.exports = function(compiledData,rawData) {
  let outputJSON = {}
  for(let i in compiledData) {
    let pokemon = compiledData[i]
    let pokemonName = Dex.getSpecies(pokemon.name)
    if(FormatConfig.pokemonExclude.indexOf(pokemonName) != -1)
      continue

    outputJSON[pokemonName] = {
      'Abilities':{},
      'Moves':{},
      'Teammates':{},
      'Items':{},
      'Spreads':{},
      'Raw count': pokemon.raw_count,
      'Usage %': pokemon.usage_per,
      'Rank': (parseInt(i)+1),
      'viability': pokemon.viability
    }

    let j = 0
    while(pokemon.ability.hasOwnProperty(j) && (100*(pokemon.ability[j].usage)) > 1) {
      if(pokemon.ability[j] == undefined) break
      outputJSON[pokemonName]['Abilities'][pokemon.ability[j].ability] = (100*(pokemon.ability[j].usage)).toFixed(3)
      j++
    }

    j = 0
    while(pokemon.item.hasOwnProperty(j) && (100*(pokemon.item[j].usage)) > 1) {
      if(pokemon.item[j] == undefined) break
      outputJSON[pokemonName]['Items'][Dex.getItem(pokemon.item[j].item)] = (100*(pokemon.item[j].usage)).toFixed(3)
      j++
    }

    j = 0
    while(pokemon.nature.hasOwnProperty(j) && (100*(pokemon.nature[j].usage)) > 1) {
      if(pokemon.nature[j] == undefined) break
      outputJSON[pokemonName]['Spreads'][pokemon.nature[j].nature] = (100*(pokemon.nature[j].usage)).toFixed(3)
      j++
    }

    j = 0
    while(pokemon.moves.hasOwnProperty(j) && (100*(pokemon.moves[j].usage)) > 1) {
      if(pokemon.moves[j] == undefined) break
      outputJSON[pokemonName]['Moves'][pokemon.moves[j].move] = (100*(pokemon.moves[j].usage)).toFixed(3)
      j++
    }

    j = 0
    while(pokemon.team.hasOwnProperty(j) && (pokemon.team[j].usage) > 1) {
      if(pokemon.team[j] == undefined) break
      outputJSON[pokemonName]['Teammates'][Dex.getSpecies(pokemon.team[j].pokemon)] = pokemon.team[j].usage.toFixed(3)
      j++
    }
  }
  return outputJSON
}
