/**
 *
 * calculateWeight
 *
 * Calculate this Pokemon's weight, based on trainer's
 * rating, versus the requested rating cutoff for this
 * data batch. A trainer equal to cutoff will return
 * a 0.5 weight, someone well above will return a ~1.0
 * weight.
 *
 * This weight will be used for incrementing all different
 * stats for each Pokemon.
 *
 */

const erf = require( 'math-erf' )

module.exports = function(rating, cutoff, outcome) {
  let weight = (1+erf((1500-cutoff)/(Math.sqrt(2)*130)))/2
  if(rating != undefined && rating.hasOwnProperty('rpr')) {
    if(rating['rprd'] > 100 && cutoff > 1500) {
      weight = 0
    } else {
      weight = (erf((rating['rpr']-cutoff)/(rating['rprd'])/Math.sqrt(2.0))+1.0)/2.0
    }
  }
  else if(outcome != undefined && outcome == 'win') {
    weight = (erf((1540.16061434-cutoff)/(122.858308077)/Math.sqrt(2.0))+1.0)/2.0
  }
  else if(outcome != undefined && outcome == 'loss') {
    weight = (erf((1459.83938566-cutoff)/(122.858308077)/Math.sqrt(2.0))+1.0)/2.0
  }
  return weight
}
