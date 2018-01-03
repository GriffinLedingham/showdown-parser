const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const _ = require('lodash')
const cluster = require('cluster')

const cores = 8
const fileMult = 10000

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

let processTeam = function(team, pokemonData) {
  for(let i = 0;i<team.length;i++) {
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

let successCall = function(data, pokemonData) {
  processTeam(data['p1team'], pokemonData)
  processTeam(data['p2team'], pokemonData)
}

let failCall = function(err) {

}

let mergePokemonData = function(dataA, dataB) {
  for(var key in dataB) {
    if(dataA.hasOwnProperty(key)) {
      let pokemonItem = dataB[key]
      for(var move in pokemonItem.moves) {
        dataA[key]['moves'][move] += pokemonItem['moves'][move]
      }
      dataA[key]['count'] += pokemonItem['count']
      dataA[key]['item'] += pokemonItem['item']
      dataA[key]['ability'] += pokemonItem['ability']
      dataA[key]['nature'] += pokemonItem['nature']
    } else {
      dataA[key] = dataB[key]
    }
  }
}

if (cluster.isMaster) {
  let documentsProcessed = 0
  let documentsTotal = 0
  let pokemonData = {}
  fs.readdir('../../Downloads/2018-01-02', (err, filenames) => {

    let multFiles = []
    for(var i = 0;i<fileMult/cores;i++) {
      multFiles = multFiles.concat(filenames)
    }

    const startTs = new Date().getTime()

    for (var t = 0; t < cores; t++) {
      var worker = cluster.fork();

      worker.on('message', function(data) {
        documentsProcessed += data.documentsProcessed
        //Bring pokemon data from worker back in
        mergePokemonData(pokemonData, data.pokemonData)
        this.destroy();
      });

      worker.send(multFiles);
    }

    cluster.on('exit', function(worker) {
      if (Object.keys(cluster.workers).length === 0) {
        jsonfile.writeFileSync('working_data/raw_data.json', pokemonData)
        formatData(pokemonData)
        console.log(new Date().getTime() - startTs)
        process.exit(1);
      }
    });
  })
} else {
  let pokemonData = {}
  let documentsProcessed = 0

  process.on('message', function(workerData) {
    console.log('Process ' + process.pid + '  is starting to sort.');
    workerData.forEach((filename) => {
      documentsProcessed++
      successCall(require(path.resolve('../../Downloads/2018-01-02', filename)), pokemonData)
      if(workerData.length == documentsProcessed) {
        process.send({documentsProcessed:documentsProcessed, pokemonData:pokemonData})
      }
    })
  });
}
