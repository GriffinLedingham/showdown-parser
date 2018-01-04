const Progress = require('progress')

class ProgressBar {
  constructor(fileLength) {
    this.bar = new Progress('  Processing [:bar] :rate/lps :percent :etas', {
      complete: '=',
      incomplete: '-',
      width: 20,
      total: fileLength
    })
  }

  tick(count) {
    this.bar.tick(count)
  }
}

module.exports = ProgressBar
