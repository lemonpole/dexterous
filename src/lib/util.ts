import { ChainLink, NamedAPIResource, Pokemon, Type as MoveType, TypeRelations } from 'pokenode-ts';
import * as Constants from './constants';


export function buildMediaQuery( query: string, size: number, units = 'px' ) {
  return `(${query}: ${size}${units})`;
}


/**
 * Calculates final damage modifier value by
 * multiplying the damage dealt per type.
 *
 * e.g.:  - poison -> grass
 *        - water(2) x poison(0.5)
 *        - = 1
 */

export function calculateDamageModifier( moveType: MoveType, pokemon: Pokemon ) {
  // typecast to make typescript happy
  type IterableDamageRelations = TypeRelations & Record<string, NamedAPIResource[]>;
  const damageRelations = moveType.damage_relations as IterableDamageRelations;

  // grab the damage modifiers only
  //
  // @note: normal damage is filtered out as
  //        it technically is not a modifier
  const damageModifierKeys = Object
    .keys( damageRelations )
    .filter( modifierKey => modifierKey.toLowerCase().indexOf( '_damage_to' ) >= 0 )
    .filter( modifierKey => damageRelations[ modifierKey ].some( typeRelation => {
      // is the current pokemon's only
      // type weak to this move?
      if( pokemon.types.length === 1 ) {
        return typeRelation.name === pokemon.types[ 0 ].type.name;
      }

      // is either of the pokemon's types
      // weak to the current move?
      return typeRelation.name === pokemon.types[ 0 ].type.name || typeRelation.name === pokemon.types[ 1 ].type.name
    }))
  ;

  // find the modifier key for the total damage
  // dealt and return its calculated values
  if( damageModifierKeys.length > 0 ) {
    const totalDamage = damageModifierKeys
      .map( modifierKey => Constants.DamageModifiers[ modifierKey ] )
      .reduce( ( total, modifierData ) => modifierData[ 0 ] * total, 1.0 )
    ;
    const totalDamageModifierKey = Object
      .keys( Constants.DamageModifiers )
      .find( modifierKey => Constants.DamageModifiers[ modifierKey ][ 0 ] === totalDamage )
    ;
    return {
      damage: totalDamage,
      modifierKey: totalDamageModifierKey,
      modifierValue: Constants.DamageModifiers[ totalDamageModifierKey || '' ],
      moveType
    };
  }

  // otherwise, this move does normal damage
  return {
    damage: Constants.DamageModifiers.normal_damage_to[ 0 ],
    modifierKey: 'normal_damage_to',
    modifierValue:  Constants.DamageModifiers.normal_damage_to,
    moveType
  };
}


/**
 * Parse evolution chain/tree.
 *
 * - @todo: add eevee support which can have multiple branches from the same node
 */

export function flattenEvolutionTree( chainLink: ChainLink, all: ChainLink[] = [] ): ChainLink[] {
  const [ next ] = chainLink.evolves_to || [];

  all.push( chainLink );

  if( next ) {
    return flattenEvolutionTree( next, all );
  }

  return all;
}


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

    return out;
  }
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
