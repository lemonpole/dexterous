import * as Types from './types';


/**
 * A simple string templating formatter.
 *
 * @param template  The template string. e.g.: "Level up using {0}."
 * @param values    An array of values to inject into the template string.
 */

export function formatString( template: string, values: string[] ) {
  let out = '';

  if( values.length ) {
    const args: any = typeof values[ 0 ] === 'string' || typeof values[ 0 ] === 'number'
      ? Array.prototype.slice.call(values)
      : values[ 0 ]
    ;

    for( const key in args ) {
      out = template.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
    }
  }

  return out;
}


/**
 * Left pad the provided number if it is lower
 * than the minimum number of digits.
 *
 * @param num The number to pad.
 * @param min The minimum amount of digits to pad for.
 */

export function leftPadInt( num: number, min = 2 ) {
  let numStr = num.toString();
  while( numStr.length < min ) {
    numStr = '0' + numStr;
  }
  return numStr;
}


/**
 * Calculates final damage modifier value by
 * multiplying the damage dealt per type.
 *
 * e.g.:  - poison -> grass
 *        - water(2) x poison(0.5)
 *        - = 1
 *
 * @param modifierList The list of damage modifiers to parse.
 */

export function calculateDamageModifier( modifierList: Types.PokemonEfficacy[] ) {
  // base damage is 100 so we'll divide by this amount
  // to get more meaningful damage numbers like:
  //
  // - 0.5 = half damage
  // - 2.0 = double damage
  const modifierOffset = 100;

  // calculate the total and return
  return modifierList
    .map( modifier => modifier.damage_factor )
    .reduce( ( total, modifier ) => ( modifier * total ) / modifierOffset, 1.0 )
  ;
}
