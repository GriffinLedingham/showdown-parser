module.exports = function() {
  let format, date
  const args = process.argv
  for(let arg in args) {
    if(args[arg].indexOf('-f') != -1) {
      format = args[parseInt(arg)+1]
    }
    if(args[arg].indexOf('-d') != -1) {
      date = args[parseInt(arg)+1]
    }
  }
  return [format,date]
}()
