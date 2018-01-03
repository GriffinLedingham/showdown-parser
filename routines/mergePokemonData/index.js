module.exports = function(dataA, dataB) {
  for(let key in dataB) {
    if(dataA.hasOwnProperty(key)) {
      let pokemonItem = dataB[key]
      for(let move in pokemonItem.moves) {
        dataA[key]['moves'][move] += pokemonItem['moves'][move]
      }
      dataA[key]['count'] += pokemonItem['count']
      for(let ability in pokemonItem.ability) {
        dataA[key]['ability'][ability] += pokemonItem['ability'][ability]
      }
      for(let item in pokemonItem.item) {
        dataA[key]['item'][item] += pokemonItem['item'][item]
      }
      for(let nature in pokemonItem.nature) {
        dataA[key]['nature'][nature] += pokemonItem['nature'][nature]
      }
    } else {
      dataA[key] = dataB[key]
    }
  }
}
