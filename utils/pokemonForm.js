module.exports = function(name) {
  name = name.name
  for(let key in FormatConfig.pokemonForm) {
    if(name.indexOf(FormatConfig.pokemonForm[key]) != -1) {
      name = name.replace(FormatConfig.pokemonForm[key], '')
    }
  }
  return name
}
