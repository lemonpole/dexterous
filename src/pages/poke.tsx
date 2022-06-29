import React from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Drawer } from '@blueprintjs/core';
import { EvolutionChain, Move, PokemonSpecies } from 'pokenode-ts';
import { AppStateContext } from '../redux/context';
import { API } from '../lib';
import { DeviceDetector, PokeDetails, PokeList } from '../components';


interface PokeProps {
  filter?: string;
}


/**
 * Scrolls the user to the top of the page on every page transition.
 */

function ScrollToTop( props: { children: React.ReactNode }) {
  const location = useLocation();
  React.useEffect(
    () => window.scrollTo( 0, 0 ),
    [ location ]
  );

  return <>{props.children}</>
}


export default function Poke( props: PokeProps ) {
  // init data
  const params = useParams();
  const navigate = useNavigate();
  const { state } = React.useContext( AppStateContext );
  const pokemon = state.pokemon.find( pokemon => pokemon.name.toLowerCase() === params.name?.toLowerCase() );

  // fetch extra pokemon details
  const [ pokemonSpecies, setPokemonSpecies ] = React.useState<PokemonSpecies>();
  const [ pokemonEvolutionChain, setPokemonEvolutionChain ] = React.useState<EvolutionChain>();
  const [ pokemonMoveSet, setPokemonMoveSet ] = React.useState<Move[]>();

  React.useEffect( () => {
    if( !pokemon ) {
      return;
    }

    API
      .getPokemonClient()
      .getPokemonSpeciesByName( pokemon.species.name )
      .then( setPokemonSpecies )
    ;

    Promise
      .all( pokemon.moves.map( ({ move }) => API.getMoveClient().getMoveByName( move.name ) ) )
      .then( setPokemonMoveSet )
    ;
  }, [ pokemon ]);

  React.useEffect( () => {
    if( !pokemonSpecies ) {
      return;
    }

    API
      .getUtilityClient()
      .getResourceByUrl( pokemonSpecies.evolution_chain.url )
      .then( setPokemonEvolutionChain )
    ;
  }, [ pokemonSpecies ]);

  const commonProps = {
    pokemon,
    allPokemon: state.pokemon,
    moveTypes: state.moveTypes,
    species: pokemonSpecies,
    evolutionChain: pokemonEvolutionChain,
    gameVersions: state.gameVersions,
    moveSet: pokemonMoveSet,
    onEvolutionClick: ( pokemonName: string ) => navigate( `/${pokemonName}` ),
  };

  return (
    <>
      {/* RENDER IN A DRAWER ON DESKTOP */}
      <DeviceDetector.DesktopView>
        <Drawer
          isOpen={true}
          size={'33%'}
          className={classNames({ 'bp4-dark': state.theme })}
          onClose={() => navigate( '/' )}
        >
          <PokeDetails {...commonProps} />
        </Drawer>
      </DeviceDetector.DesktopView>

      {/* RENDER IN FULL ON MOBILE */}
      <DeviceDetector.MobileView>
        <ScrollToTop>
          {/* SHOW LIST IF USER IS SEARCHING */}
          {!!props.filter && (
            <section className="container">
              <PokeList
                data={state.pokemon.filter( pokemon => pokemon.name.toLowerCase().indexOf( props.filter?.toLowerCase() || '' ) >= 0 )}
                onClick={pokemon => navigate( `/${pokemon.name}` )}
              />
            </section>
          )}

          {/* OTHERWISE, SHOW THE DETAILS IN FULL */}
          {!props.filter && <PokeDetails {...commonProps} />}
        </ScrollToTop>
      </DeviceDetector.MobileView>
    </>
  );
}
