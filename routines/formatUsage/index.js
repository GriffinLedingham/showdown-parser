/**
 *
 * formatUsage
 *
 * This will output the compiled data into a format like is used
 * on Smogon for their usage stats reports. Not much happens in here
 * aside from pulling all the compiled data together and some view
 * logic for building the ASCII table.
 *
 */

// This expects Pokemon-Showdown to be cloned at the directory below
// https://github.com/Zarel/Pokemon-Showdown
const Dex = require('@pkmn/dex').Dex

module.exports = function(compiledData,rawData) {
  let count = 0
  let outputString = ``
  outputString += '+ ---- + ---------------------- + --------- + ------ + ' + '\n'
  outputString += '| Rank | Pokemon                | Usage %   | Raw    | ' + '\n'
  outputString += '+ ---- + ---------------------- + --------- + ------ + ' + '\n'
  for(let i in compiledData) {
    let pokemon = compiledData[i]
    outputString += `| ${padString((count+1).toString(),5)}| ${padString(pokemon.name, 22)} | ${padStringFront((pokemon.usage_per.toFixed(5)).toString(),8)}% | ${padString((pokemon.raw_count).toString(),6)} | \n`
    // outputString += '| '+padString(Dex.getSpecies(pokemon.name),39)+'| ' + '\n'
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '| '+padString('Raw count: ' + pokemon.raw_count,39)+'| ' + '\n'
    // outputString += '| '+padString('Avg. weight: ' + pokemon.avg_weight,39)+'| ' + '\n'
    // outputString += '| '+padString('Viability Ceiling: ' + pokemon.viability,39)+'| ' + '\n'
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '| '+padString('Abilities',39)+'| ' + '\n'
    // let j = 0
    // while(pokemon.ability.hasOwnProperty(j)) {
    //   if(pokemon.ability[j] == undefined) break
    //   outputString += '| '+padString(pokemon.ability[j].ability + ' ' + (100*(pokemon.ability[j].usage)).toFixed(3) + '%',39)+'| ' + '\n'
    //   j++
    // }
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '| '+padString('Items',39)+'| ' + '\n'
    // j = 0
    // while(pokemon.item.hasOwnProperty(j) && (100*(pokemon.item[j].usage)) > 1) {
    //   if(pokemon.item[j] == undefined) break
    //   outputString += '| '+padString(Dex.getItem(pokemon.item[j].item) + ' ' + (100*(pokemon.item[j].usage)).toFixed(3) + '%',39)+'| ' + '\n'
    //   j++
    // }
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '| '+padString('Spreads',39)+'| ' + '\n'
    // j = 0
    // while(pokemon.nature.hasOwnProperty(j) && (100*(pokemon.nature[j].usage)) > 1) {
    //   if(pokemon.nature[j] == undefined) break
    //   outputString += '| '+padString(pokemon.nature[j].nature + ' ' + (100*(pokemon.nature[j].usage)).toFixed(3) + '%',39)+'| ' + '\n'
    //   j++
    // }
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '| '+padString('Moves',39)+'| ' + '\n'
    // j = 0
    // while(pokemon.moves.hasOwnProperty(j) && (100*(pokemon.moves[j].usage)) > 1) {
    //   if(pokemon.moves[j] == undefined) break
    //   outputString += '| '+padString(Dex.getMove(pokemon.moves[j].move) + ' ' + (100*(pokemon.moves[j].usage)).toFixed(3) + '%',39)+'| ' + '\n'
    //   j++
    // }
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '| '+padString('Teammates',39)+'| ' + '\n'
    // j = 0
    // while(pokemon.team.hasOwnProperty(j) && (pokemon.team[j].usage) > 1) {
    //   if(pokemon.team[j] == undefined) break
    //   outputString += '| '+padString(Dex.getSpecies(pokemon.team[j].pokemon) + ' ' + pokemon.team[j].usage.toFixed(3) + '%',39)+'| ' + '\n'
    //   j++
    // }
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '| '+padString('Checks and Counters',39)+'| ' + '\n'
    // outputString += '+----------------------------------------+ ' + '\n'
    // outputString += '\n'

    count++
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

function padStringFront(string,length) {
  let output = ''
  for(let i = 0;i<length-string.length;i++) {
    output += ' '
  }
  output += string
  return output
}
