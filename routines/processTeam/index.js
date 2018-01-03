module.exports = function(team, pokemonData) {
  for(let i = 0;i<team.length;i++) {
    let pokemonItem = team[i]
    let species = pokemonItem['species']

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
  }
}

let initPokemon = function(species, pokemonData) {
  pokemonData[species] = {
    moves:{},
    ability:{},
    nature:{},
    item:{},
    count:0
  }
}

let incrementMoves = function(moves, pokemonData) {
  moves.forEach((move)=>{
    if(pokemonData['moves'][move] != undefined) {
      pokemonData['moves'][move]++
    } else {
      pokemonData['moves'][move] = 1
    }
  })
}

let incrementAbility = function(ability, pokemonData) {
  if(pokemonData['ability'][ability] != undefined) {
    pokemonData['ability'][ability]++
  } else {
    pokemonData['ability'][ability] = 1
  }
}

let incrementNature = function(nature, pokemonData) {
  if(pokemonData['nature'][nature] != undefined) {
    pokemonData['nature'][nature]++
  } else {
    pokemonData['nature'][nature] = 1
  }
}

let incrementItem = function(item, pokemonData) {
  if(pokemonData['item'][item] != undefined) {
    pokemonData['item'][item]++
  } else {
    pokemonData['item'][item] = 1
  }
}
