import PokeBadge from '../poke-badge/poke-badge';
import { Pokemon } from 'pokenode-ts';
import { Card, Classes, Elevation } from '@blueprintjs/core';
import './poke-list.scss';


interface PokeListProps {
  skeletonItemNum?: number;
  skeletonLineNum?: number;
  data: Pokemon[];
  onClick: ( item: Pokemon ) => void;
}


interface PokeListItemProps {
  data: Pokemon;
  onClick: ( item: Pokemon ) => void;
}


const DEFAULT_SKELETON_ITEM_NUM = 20;
const DEFAULT_SKELETON_LINE_NUM = 3;


function PokeListItem( props: PokeListItemProps ) {
  return (
    <Card
      interactive
      key={props.data.id}
      elevation={Elevation.TWO}
      onClick={() => props.onClick( props.data )}
    >
      <article>
        <h3 className="upper bp4-text-overflow-ellipsis">
          {props.data.name}
        </h3>
      </article>
      <article className="grid-spacing">
        {props.data.types.map( PokeBadge )}
      </article>
      {!!props.data.sprites.front_default && (
        <article>
          <img
            src={props.data.sprites?.front_default || ''}
            alt={props.data.name}
          />
        </article>
      )}
    </Card>
  );
}


export default function PokeList( props: PokeListProps ) {
  if( props.data.length === 0 ) {
    return (
      <section className="pokemon-list">
        {[ ...Array( props.skeletonItemNum || DEFAULT_SKELETON_ITEM_NUM ) ].map( ( _, idx ) => (
          <Card
            key={idx}
            elevation={Elevation.TWO}
          >
            {[ ...Array( props.skeletonLineNum || DEFAULT_SKELETON_LINE_NUM ) ].map( ( _, idx ) => (
              <p key={idx} className={Classes.SKELETON}>{'Loading...'}</p>
            ))}
          </Card>
        ))}
      </section>
    );
  }

  return (
    <section className="pokemon-list">
      {props.data.map( pokemon => (
        <PokeListItem
          key={pokemon.id}
          onClick={props.onClick}
          data={pokemon}
        />
      ))}
    </section>
  );
}
