/**
 *
 * formatData
 *
 * This will output the compiled data into a format like is used
 * on Smogon for their usage stats reports. Not much happens in here
 * aside from pulling all the compiled data together and some view
 * logic for building the ASCII table.
 *
 */

module.exports = function(compiledData,rawData,totalLogs) {
  let outputString = ``
  for(let i in compiledData) {
    let pokemon = compiledData[i]
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '| '+padString(pokemon.name,39)+'| ' + '\n'
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '| '+padString('Raw count: ' + pokemon.count,39)+'| ' + '\n'
    outputString += '| '+padString('Avg. weight: 1.0',39)+'| ' + '\n'
    outputString += '| '+padString('Viability Ceiling: 100',39)+'| ' + '\n'
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '| '+padString('Abilities',39)+'| ' + '\n'
    for(let j = 0;j<10;j++) {
      if(pokemon.ability[j] == undefined) break
      outputString += '| '+padString(pokemon.ability[j].ability + ' ' + (100*(pokemon.ability[j].usage)).toFixed(3) + '%',39)+'| ' + '\n'
    }
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '| '+padString('Items',39)+'| ' + '\n'
    for(let j = 0;j<10;j++) {
      if(pokemon.item[j] == undefined) break
      outputString += '| '+padString(pokemon.item[j].item + ' ' + (100*(pokemon.item[j].usage)).toFixed(3) + '%',39)+'| ' + '\n'
    }
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '| '+padString('Moves',39)+'| ' + '\n'
    for(let j = 0;j<10;j++) {
      if(pokemon.moves[j] == undefined) break
      outputString += '| '+padString(pokemon.moves[j].move + ' ' + (100*(pokemon.moves[j].usage)).toFixed(3) + '%',39)+'| ' + '\n'
    }
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '| '+padString('Teammates',39)+'| ' + '\n'
    for(let j = 0;j<10;j++) {
      if(pokemon.team[j] == undefined) break
      outputString += '| '+padString(pokemon.team[j].pokemon + ' ' + pokemon.team[j].usage.toFixed(3) + '%',39)+'| ' + '\n'
    }
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '| '+padString('Checks and Counters',39)+'| ' + '\n'
    outputString += '+----------------------------------------+ ' + '\n'
    outputString += '\n'
  }
  return outputString
}

function padString(string,length) {
  let output = string
  for(let i = 0;i<length-string.length;i++) {
    output += ' '
  }
  return output
}
