/**
 *
 * victoryChanceGXE
 *
 * I admittedly do not know what's happening here. Referenced from
 * https://github.com/Antar1011/Smogon-Usage-Stats/blob/master/common.py#L32
 *
 */


module.exports = function(rating, deviation) {
  let C=3.0*Math.pow(Math.log(10.0),2.0)/Math.pow(400.0*Math.PI,2)
	return 1.0 / (1.0 + Math.pow(10.0,(1500-rating)/400.0/Math.sqrt(1.0+C*(Math.pow(deviation,2.0)+Math.pow(130,2.0)))))
}
