/**
 *
 * compileData
 *
 * This will normalize the data for outputting as usage stats.
 * This will likely also be where weighting comes into play for
 * processing logs at a specific ELO rating.
 *
 */

const jsonfile    = require('jsonfile')
const _           = require('lodash')

module.exports = function(rawData,teamCount) {
  let compiledData = _.cloneDeep(rawData)
  for(let name in compiledData) {
    let pokemonItem = compiledData[name]
    let totalWeight = 0
    for(let key in pokemonItem['avg_weight']) {
      totalWeight += pokemonItem['avg_weight'][key]
    }
    pokemonItem['avg_weight'] = totalWeight/pokemonItem['avg_weight'].length
    pokemonItem['viability'] = Math.round(pokemonItem['viability']/AppConfig.threads)
    for(let key in pokemonItem['moves']) {
      pokemonItem['moves'][key] = (pokemonItem['moves'][key]/pokemonItem['count'])
    }
    pokemonItem['moves'] = Object.keys(pokemonItem['moves']).map(function(key) {
      return {move:key,usage:pokemonItem['moves'][key]};
    }).sort(function(a, b){
      return b.usage-a.usage
    })

    for(let key in pokemonItem['ability']) {
      pokemonItem['ability'][key] = (pokemonItem['ability'][key]/pokemonItem['count'])
    }
    pokemonItem['ability'] = Object.keys(pokemonItem['ability']).map(function(key) {
      return {ability:key,usage:pokemonItem['ability'][key]};
    }).sort(function(a, b){
      return b.usage-a.usage
    })

    for(let key in pokemonItem['nature']) {
      pokemonItem['nature'][key] = (pokemonItem['nature'][key]/pokemonItem['count'])
    }
    pokemonItem['nature'] = Object.keys(pokemonItem['nature']).map(function(key) {
      return {nature:key,usage:pokemonItem['nature'][key]};
    }).sort(function(a, b){
      return b.usage-a.usage
    })

    for(let key in pokemonItem['item']) {
      pokemonItem['item'][key] = (pokemonItem['item'][key]/pokemonItem['count'])
    }
    pokemonItem['item'] = Object.keys(pokemonItem['item']).map(function(key) {
      return {item:key,usage:pokemonItem['item'][key]};
    }).sort(function(a, b){
      return b.usage-a.usage
    })

    for(let key in pokemonItem['team']) {
      let origKey = key
      key = pokemonForm(Dex.getSpecies(key))
      if(rawData[key] == undefined) continue
      pokemonItem['team'][key] = (
        (100*(
          pokemonItem['team'][origKey]/pokemonItem['count']
        )).toFixed(3)
        -
        (100*(
          rawData[key].count/teamCount
        )).toFixed(3) )
      if(origKey != key)
        delete pokemonItem['team'][origKey]
    }
    pokemonItem['team'] = Object.keys(pokemonItem['team']).map(function(key) {
      return {pokemon:key,usage:pokemonItem['team'][key]};
    }).sort(function(a, b){
      return b.usage-a.usage
    })

    pokemonItem['usage_per'] = 100*(pokemonItem['count']/teamCount)
  }
  return Object.keys(compiledData).map(function(key) {
    let pokemon = compiledData[key]
    pokemon.name = key
    return pokemon
  }).sort(function(a, b){
    return b.count-a.count
  })
}
