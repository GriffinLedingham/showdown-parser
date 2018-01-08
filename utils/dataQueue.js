class DataQueue {
  constructor() {
    this.queue = []
  }

  push(data) {
    this.queue.push(data)
  }

  pop() {
    return this.queue.shift()
  }

  getCount() {
    return this.queue.length
  }

  // Stitch all objects stored in data queue, using
  // incoming function for stitching
  stitchData(stitchFunction) {
    let result = {}
    let queueLength = this.getCount()
    for(let i = 0;i<queueLength;i++) {
      result = stitchFunction(result,this.pop())
    }
    return result
  }

}

module.exports = DataQueue
