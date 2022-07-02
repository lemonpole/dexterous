import classNames from 'classnames';
import PokeBadge from '../poke-badge/poke-badge';
import { Callout, Classes, HTMLTable, Tab, Tabs } from '@blueprintjs/core';
import { Dictionary, groupBy } from 'lodash';
import {
  EvolutionChain, EvolutionDetail,
  Pokemon, PokemonMove, Move,
  PokemonMoveVersion, PokemonSpecies,
  Type as MoveType,
  Version as GameVersion
} from 'pokenode-ts';
import { useProgressiveImg } from '../../hooks';
import { Constants, util } from '../../lib';
import './poke-details.scss';


interface PokeDetailsProps {
  allPokemon?: Pokemon[];
  pokemon?: Pokemon;
  moveTypes?: MoveType[];
  species?: PokemonSpecies;
  evolutionChain?: EvolutionChain;
  gameVersions?: GameVersion[];
  moveSet?: Move[],
  onEvolutionClick: ( name: string ) => void;
}


function CoverPhoto( props: Partial<PokeDetailsProps> ) {
  const coverPhoto = props.pokemon?.sprites.other['official-artwork']?.front_default || '';
  const bgPhoto = props.pokemon?.sprites.front_default || '';
  const [ coverPhotoSrc, { blur }] = useProgressiveImg( bgPhoto, coverPhoto );

  if( !props.pokemon ) {
    return null;
  }

  return (
    <article className="cover">
      <img
        src={bgPhoto}
        alt={props.pokemon.name}
        className="blur-photo"
      />
      <aside className="cover-photo-container">
        <img
          src={coverPhotoSrc}
          alt={props.pokemon.name}
          className={classNames( 'cover-photo', { blur })}
        />
      </aside>
      <aside className="dex-id text-shadow">
        <h2>{`#${props.pokemon.id}`}</h2>
      </aside>
    </article>
  );
}


function MoveTypesGrid( props: Partial<PokeDetailsProps> ) {
  if( !props.moveTypes || !props.pokemon ) {
    return null;
  }

  // filter out move types that deal normal
  // damage which has no label assigned
  const damageModifiers = props.moveTypes
    .map( moveType => util.calculateDamageModifier( moveType, props.pokemon as Pokemon ) )
    .filter( damageModifier => !!damageModifier.modifierValue[ 1 ] )
    .sort( ( a, b ) => b.damage - a.damage )
  ;

  return (
    <article className={classNames( 'move-types-grid', Classes.DIALOG_BODY )}>
      <h3 className="small-caps upper">{'Type Defenses'}</h3>
      <aside>
        {damageModifiers.map( damageModifier => (
          <div key={damageModifier.moveType.name}>
            <p className={classNames('move-type', damageModifier.moveType.name )}>
              {damageModifier.moveType.name.substring( 0, 3 ).toUpperCase()}
            </p>
            <p className={classNames( 'damage-modifier', damageModifier.modifierKey, Classes.MONOSPACE_TEXT )}>
              {damageModifier.modifierValue[ 1 ]}
            </p>
          </div>
        ))}
      </aside>
    </article>
  );
}


function EvolutionGrid( props: Partial<PokeDetailsProps> ) {
  // bail early if pokemon has no evolutions
  if( !props.pokemon || !props.evolutionChain ) {
    return null;
  }

  // also bail if pokemon has no evolution details
  // in any of their supposed evolutions
  const evolutionTree = util.flattenEvolutionTree( props.evolutionChain.chain );

  if( evolutionTree.length <= 1 || evolutionTree.every( evolution => evolution.evolution_details.length === 0 ) ) {
    return null;
  }

  return (
    <article className={classNames( 'evolution-grid', Classes.DIALOG_BODY )}>
      <h3 className="small-caps upper">{'Evolutions'}</h3>
      {evolutionTree.map( evolution => {
        const [ next ] = evolution.evolves_to || [];

        if( !next ) {
          return null;
        }

        const currentPokemonDetails = props.allPokemon?.find( innerPokemon => innerPokemon.name.toLowerCase() === evolution.species.name.toLowerCase() );
        const nextPokemonDetails = props.allPokemon?.find( innerPokemon => innerPokemon.name.toLowerCase() === next.species.name.toLowerCase() );

        type IterableEvolutionDetail = EvolutionDetail & Record<string, any>;
        const [ nextEvolutionDetails ] = next.evolution_details as IterableEvolutionDetail[];
        const [ evolutionCondition ] = Object.keys( nextEvolutionDetails ).filter( conditionKey => nextEvolutionDetails[ conditionKey ] && conditionKey !== 'trigger' );

        return (
          <aside key={evolution.species.name + currentPokemonDetails?.id}>
            <div onClick={() => props.onEvolutionClick && evolution.species.name !== props.pokemon?.species.name && props.onEvolutionClick( evolution.species.name )} role="button">
              <img src={currentPokemonDetails?.sprites.front_default || ''} alt={evolution.species.name} />
              <p className="small-cups upper">{evolution.species.name}</p>
            </div>
            <div>
              <p className={classNames(Classes.MONOSPACE_TEXT, Classes.TEXT_MUTED)}>{( () => {
                const levelUpConditionFormatter = Constants.EvolutionConditions[ evolutionCondition || nextEvolutionDetails.trigger.name ] || '';

                if( typeof nextEvolutionDetails[ evolutionCondition ] === 'object' && nextEvolutionDetails[ evolutionCondition ] ) {
                  return util.formatString( levelUpConditionFormatter, [ nextEvolutionDetails[ evolutionCondition ].name.replace( '-', ' ' ) ] );
                }

                if( nextEvolutionDetails[ evolutionCondition ] ) {
                  return util.formatString( levelUpConditionFormatter, [ nextEvolutionDetails[ evolutionCondition ] ]);
                }

                return levelUpConditionFormatter;
              })()}</p>
            </div>
            <div onClick={() => props.onEvolutionClick && next.species.name !== props.pokemon?.species.name && props.onEvolutionClick( next.species.name )} role="button">
              <img src={nextPokemonDetails?.sprites.front_default || ''} alt={next.species.name} />
              <p className="small-cups upper">{next.species.name}</p>
            </div>
          </aside>
        );
      })}
    </article>
  );
}


function MoveSetPanel( props: { data: PokemonMoveVersion[] & PokemonMove[], allMoves: Move[] }) {
  // group the moves together by learn type
  const learnMethods = groupBy( props.data, item => item.move_learn_method.name );

  // scoped util function to grab the order
  // value for a particular learn method
  const getLearnMethodOrderValue = ( learnMethodKey: string ) => {
    return learnMethodKey in Constants.LearnMethods
      ? Constants.LearnMethods[ learnMethodKey ][ 0 ]
      : 0
    ;
  };

  return (
    <aside>
      {Object
        .keys( learnMethods )
        .sort( ( a, b ) => getLearnMethodOrderValue( b ) - getLearnMethodOrderValue( a ) )
        .filter( learnMethodKey => !Constants.Application.IGNORED_LEARN_METHODS.includes( learnMethodKey ) )
        .map( learnMethodKey => (
          <HTMLTable
            striped
            condensed
            key={learnMethodKey}
            className="capitalize"
          >
            <thead>
              <tr>
                <th colSpan={3}>
                  {learnMethodKey.replace( '-', ' ' )}
                </th>
              </tr>
            </thead>
            <tbody>
              {learnMethods[ learnMethodKey ]
                .sort( ( a, b ) => a.level_learned_at - b.level_learned_at )
                .map( learnMethod => {
                  const moveDetails = props.allMoves.find( move => move.name === learnMethod.move.name ) as Move;
                  return (
                    <tr key={learnMethod.move.name + learnMethod.level_learned_at}>
                      <td>
                        {learnMethod.move_learn_method.name === 'level-up'
                          ? `Lvl ${util.leftPadInt( learnMethod.level_learned_at || 1 )}`
                          : '-'
                        }
                      </td>
                      <td>
                        <p>{learnMethod.move.name.replace( '-', ' ' )}</p>
                        <p className={classNames( 'small-caps', 'upper', 'grid-spacing', Classes.TEXT_MUTED, Classes.MONOSPACE_TEXT )}>
                          <small>{'PWR: '}{moveDetails?.power || 'N/A'}</small>
                          <small>{'ACC: '}{moveDetails?.accuracy || 'N/A'}{!!moveDetails?.accuracy && '%'}</small>
                        </p>
                      </td>
                      <td>{!!moveDetails?.type && <PokeBadge type={moveDetails.type} slot={0} />}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </HTMLTable>
        ))
      }
    </aside>
  );
}


function MoveSetGrid( props: Partial<PokeDetailsProps> ) {
  // show skeleton while data is still loading
  const { gameVersions, pokemon, moveSet } = props;

  if( !pokemon || !gameVersions || !moveSet ) {
    return (
      <article className={classNames( 'moveset', Classes.DIALOG_BODY )}>
        <h3 className="small-caps upper">{'Move Set'}</h3>
        {[ ...Array( 10 ) ].map( ( _, idx ) => <p key={idx} className={Classes.SKELETON}>{'Loading...'}</p> )}
      </article>
    );
  }

  // loop through each move and group them by game
  const collectedGameMoves: Dictionary<PokemonMoveVersion[] & PokemonMove[]> = {};

  pokemon.moves.forEach( move => {
    const gameGroup = groupBy( move.version_group_details, item => item.version_group.name );
    Object.keys( gameGroup ).forEach( gameKey => {
      collectedGameMoves[ gameKey ] = [
        ...collectedGameMoves[ gameKey ] || [],
        ...gameGroup[ gameKey ].map( game => ({ ...game, ...move }) )
      ];
    });
  });

  // scoped util function to extract the pretty
  // names of games from the master list
  const buildGameName = ( gameKey: string ) => {
    if( !props.gameVersions ) {
      return '';
    }

    const gameVersion = props.gameVersions.filter( version => version.version_group.name === gameKey );
    return gameVersion.map( version => version.names.find( name => name.language.name === Constants.Application.LANGUAGE_CODE_EN )?.name ).join( '/' );
  };

  // render the list of games and their
  // moves sorted by their index number
  return (
    <article className={classNames( 'moveset', Classes.DIALOG_BODY )}>
      <h3 className="small-caps upper">{'Move Set'}</h3>
      <Tabs>
        {Object
          .keys( collectedGameMoves )
          .sort( ( a, b ) => gameVersions.findIndex( version => version.version_group.name === b ) - gameVersions.findIndex( version => version.version_group.name === a ) )
          .filter( gameKey => !Constants.Application.IGNORED_GAMES.includes( gameKey ) )
          .map( gameKey => (
            <Tab
              key={gameKey}
              id={gameKey}
              title={buildGameName( gameKey )}
              panel={<MoveSetPanel data={collectedGameMoves[ gameKey ]} allMoves={moveSet} />}
            />
          ))
        }
      </Tabs>
    </article>
  );
}


export default function PokeDetails( props: PokeDetailsProps ) {
  const pokemon = props.pokemon;
  const moveTypes = props.moveTypes;
  const summary = props.species?.flavor_text_entries.find( entry => entry.language.name === 'en' );

  // show skeleton while data is still loading
  if( !pokemon || !moveTypes || !props.species || !props.evolutionChain || !props.gameVersions ) {
    return (
      <section id="poke-details">
        <article className={classNames( 'cover', Classes.SKELETON )} />
        {[ ...Array( 2 ) ].map( ( _, idx ) => (
          <article key={idx} className={classNames( 'move-types-grid', Classes.DIALOG_BODY )}>
            <aside>
              {[ ...Array( 6 ) ].map( ( _, jdx ) => (
                <div key={jdx} className={Classes.SKELETON} />
              ))}
            </aside>
          </article>
        ))}
      </section>
    );
  }

  return (
    <section id="poke-details">
      <CoverPhoto {...props} />

      <article className={Classes.DIALOG_BODY}>
        <h1>{pokemon.name.toUpperCase()}</h1>
        <aside className="grid-spacing">{pokemon.types.map( PokeBadge )}</aside>
      </article>

      <article className={Classes.DIALOG_BODY}>
        <h3 className="small-caps upper">{'Summary'}</h3>
        <p className={Classes.RUNNING_TEXT}><em>{summary?.flavor_text?.replace( /[\n|\f]+/g, ' ' )}</em></p>
        <Callout icon="info-sign" intent="success">
          {`For full details, view ${pokemon.name.toUpperCase()}'s Pokédex entry on `}
          <a href={Constants.Application.POKEMON_DB_BASE_URL + pokemon.name} rel="noreferrer" target="_blank">{'PokemonDB.'}</a>
        </Callout>
      </article>

      <MoveTypesGrid {...props} />

      {Object.keys( props.evolutionChain ).length > 0 && (
        <EvolutionGrid {...props} />
      )}

      <MoveSetGrid {...props} />
    </section>
  );
}
