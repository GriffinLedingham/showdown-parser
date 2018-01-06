module.exports = function() {
  let format, date, cutoff, output, skipLogs
  const args = process.argv
  for(let arg in args) {
    if(args[arg].indexOf('-f') != -1) {
      format = args[parseInt(arg)+1]
    }
    if(args[arg].indexOf('-d') != -1) {
      date = args[parseInt(arg)+1]
    }
    if(args[arg].indexOf('-c') != -1) {
      cutoff = args[parseInt(arg)+1]
    }
    if(args[arg].indexOf('-o') != -1) {
      output = args[parseInt(arg)+1]
    }
    if(args[arg].indexOf('--no-logs') != -1) {
      skipLogs = true
    }
  }
  return [format,date,cutoff,output,skipLogs]
}()
