import React from 'react';
import PackageInfo from '@dxtr/package';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Constants, GraphQL, util } from '@dxtr/lib';
import { AppStateContext } from '@dxtr/redux';
import { featuredUpdate, pokemonGenerationsUpdate, pokemonTypesUpdate, pokemonUpdate } from '@dxtr/redux/actions';
import { Header, SearchOverlay } from '@dxtr/containers';
import { Details, Home } from '@dxtr/pages';
import { DeviceDetector, ExternalLink, NavBar } from '@dxtr/components';


/**
 * @component
 * @name App
 */

export default function App() {
  // query for initial pokemon data
  const { dispatch } = React.useContext( AppStateContext );
  const { data: pokemonGenerations } = useQuery<GraphQL.PokemonGenerationsQuery>( GraphQL.PokemonGenerationsDocument );
  const { data: pokemonTypes } = useQuery<GraphQL.PokemonTypesQuery>( GraphQL.PokemonTypesDocument );
  const { data: pokemonData } = useQuery<GraphQL.PokemonQuery, GraphQL.PokemonQueryVariables>(
    GraphQL.PokemonDocument,
    { variables: { limit: Constants.Application.POKEMON_INITIAL_LIMIT_NUM } }
  );

  // load into redux state
  React.useEffect( () => {
    if( pokemonData ) {
      dispatch( pokemonUpdate( pokemonData.pokemon_v2_pokemon ) );
    }
  }, [ dispatch, pokemonData ]);

  React.useEffect( () => {
    if( pokemonTypes ) {
      dispatch( pokemonTypesUpdate( pokemonTypes.pokemon_v2_type ) );
    }
  }, [ pokemonTypes, dispatch ]);

  React.useEffect( () => {
    if( pokemonGenerations ) {
      dispatch( pokemonGenerationsUpdate( pokemonGenerations.pokemon_v2_generation ) );
    }
  }, [ pokemonGenerations, dispatch ]);

  // load featured pokemon ids into state to prevent
  // re-shuffles when transitioning through pages
  React.useEffect( () => {
    if( pokemonData ) {
      const featuredIds = util.randomArray( Constants.Application.POKEMON_FEATURED_NUM, 1, pokemonData.pokemon_v2_pokemon.length - 1 );
      const featuredList =  pokemonData.pokemon_v2_pokemon.filter( pokemon => featuredIds.includes( pokemon.id ) );
      dispatch( featuredUpdate( featuredList ) );
    }
  }, [ pokemonData, dispatch ]);

  return (
    <React.Fragment>
      {/* RENDER HEADER */}
      <SearchOverlay />
      <Header />

      {/* RENDER ROUTE HIERARCHY FOR DESKTOP */}
      <DeviceDetector.DesktopView>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":name" element={<Details />} />
          </Route>
        </Routes>
      </DeviceDetector.DesktopView>

      {/* RENDER ROUTE HIERARCHY FOR MOBILE */}
      <DeviceDetector.MobileView>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":name" element={<Details />} />
        </Routes>
      </DeviceDetector.MobileView>

      {/* RENDER FOOTER WITH LEGAL INFO */}
      <NavBar
        as="footer"
        variant="footer"
        fontSize="sm"
      >
        <p>
          An&nbsp;
          <ExternalLink href={PackageInfo.repository.url}>
            open source
          </ExternalLink>
          Pokédex built using&nbsp;
          <ExternalLink href="https://pokeapi.co">
            PokéAPI
          </ExternalLink>.
        </p>
        <p>
          All content is &copy; Nintendo, Game Freak, and The Pokémon Company.
        </p>
      </NavBar>
    </React.Fragment>
  );
}
