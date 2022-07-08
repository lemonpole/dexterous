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
