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

module.exports = function(rawData) {
  let compiledData = _.cloneDeep(rawData)
  for(let name in compiledData) {
    let pokemonItem = compiledData[name]
    for(let key in pokemonItem['moves']) {
      pokemonItem['moves'][key] = (pokemonItem['moves'][key]/pokemonItem['count'])
    }
    for(let key in pokemonItem['ability']) {
      pokemonItem['ability'][key] = (pokemonItem['ability'][key]/pokemonItem['count'])
    }
    for(let key in pokemonItem['nature']) {
      pokemonItem['nature'][key] = (pokemonItem['nature'][key]/pokemonItem['count'])
    }
    for(let key in pokemonItem['item']) {
      pokemonItem['item'][key] = (pokemonItem['item'][key]/pokemonItem['count'])
    }
  }
  return compiledData
}
