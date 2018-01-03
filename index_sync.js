const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const _ = require('lodash')
const cluster = require('cluster')

const startTs = new Date().getTime()

let totalCount = 0
let pokemonData = {

}

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err)
      return
    }
    filenames.forEach((filename) => {
      onFileContent(require(path.resolve(dirname, filename)))
    })
    jsonfile.writeFileSync('output_data/raw_data.json', pokemonData)
    formatData(pokemonData)
    console.log(new Date().getTime() - startTs)
  })
}

let formatData = function(rawData) {
  let formattedData = _.cloneDeep(rawData)
  Object.keys(formattedData).forEach(function(name) {
    let pokemonItem = formattedData[name]
    Object.keys(pokemonItem['moves']).forEach(function(key) {
      pokemonItem['moves'][key] = (pokemonItem['moves'][key]/pokemonItem['count'])
    })
    Object.keys(pokemonItem['ability']).forEach(function(key) {
      pokemonItem['ability'][key] = (pokemonItem['ability'][key]/pokemonItem['count'])
    })
    Object.keys(pokemonItem['nature']).forEach(function(key) {
      pokemonItem['nature'][key] = (pokemonItem['nature'][key]/pokemonItem['count'])
    })
    Object.keys(pokemonItem['item']).forEach(function(key) {
      pokemonItem['item'][key] = (pokemonItem['item'][key]/pokemonItem['count'])
    })
  })
  jsonfile.writeFileSync('output_data/format_data.json', formattedData)
}

let processTeam = function(team) {
  for(let i = 0;i<team.length;i++) {
    totalCount++
    let pokemonItem = team[i]
    if(pokemonData[pokemonItem['species']] == undefined) {
      pokemonData[pokemonItem['species']] = {
        moves:{},
        ability:{},
        nature:{},
        item:{},
        count:0
      }
    }
    pokemonData[pokemonItem['species']]['count']++
    pokemonItem['moves'].forEach((move)=>{
      if(pokemonData[pokemonItem['species']]['moves'][move] != undefined) {
        pokemonData[pokemonItem['species']]['moves'][move]++
      } else {
        pokemonData[pokemonItem['species']]['moves'][move] = 1
      }
    })

    if(pokemonData[pokemonItem['species']]['ability'][pokemonItem['ability']] != undefined) {
      pokemonData[pokemonItem['species']]['ability'][pokemonItem['ability']]++
    } else {
      pokemonData[pokemonItem['species']]['ability'][pokemonItem['ability']] = 1
    }

    if(pokemonData[pokemonItem['species']]['nature'][pokemonItem['nature']] != undefined) {
      pokemonData[pokemonItem['species']]['nature'][pokemonItem['nature']]++
    } else {
      pokemonData[pokemonItem['species']]['nature'][pokemonItem['nature']] = 1
    }

    if(pokemonData[pokemonItem['species']]['item'][pokemonItem['item']] != undefined) {
      pokemonData[pokemonItem['species']]['item'][pokemonItem['item']]++
    } else {
      pokemonData[pokemonItem['species']]['item'][pokemonItem['item']] = 1
    }

  }
}

let successCall = function(data) {
  processTeam(data['p1team'], pokemonData)
  processTeam(data['p2team'], pokemonData)
}

let failCall = function(err) {

}


readFiles('../../Downloads/2018-01-02', successCall, failCall)
