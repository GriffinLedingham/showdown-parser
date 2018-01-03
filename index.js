const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const _ = require('lodash')
const cluster = require('cluster')

const ProcessTeam = require('./routines/ProcessTeam')
const MergePokemonData = require('./routines/MergePokemonData')

const cores = 8
const fileMult = 1000

let formatData = function(rawData) {
  let formattedData = _.cloneDeep(rawData)
  for(let name in formattedData) {
    let pokemonItem = formattedData[name]
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
  jsonfile.writeFileSync('output_data/format_data.json', formattedData)
}

let successCall = function(data, pokemonData) {
  ProcessTeam(data['p1team'], pokemonData)
  ProcessTeam(data['p2team'], pokemonData)
}

let failCall = function(err) {

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
        MergePokemonData(pokemonData, data.pokemonData)
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
