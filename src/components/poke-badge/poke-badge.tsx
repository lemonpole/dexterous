import { Tag } from '@blueprintjs/core';
import { PokemonType } from 'pokenode-ts';
import classNames from 'classnames';


/**
 * This component shows the pokemon type with its
 * corresponding color in a pretty little badge.
 */

export default function PokeBadge( props: PokemonType ) {
  return (
    <Tag
      key={props.type.url}
      round
      className={classNames( 'poke-badge', 'move-type', props.type.name.toLowerCase() )}
    >
      {props.type.name}
    </Tag>
  );
}
