import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Constants, GraphQL } from '@dxtr/lib';
import { AppStateContext } from '@dxtr/redux';
import { pokemonTypesUpdate, pokemonUpdate } from '@dxtr/redux/actions';
import { Header, SearchOverlay } from '@dxtr/containers';
import { Details, Home } from '@dxtr/pages';
import { DeviceDetector } from '@dxtr/components';


/**
 * @component
 * @name App
 */

export default function App() {
  // query for initial pokemon data
  const { dispatch } = React.useContext( AppStateContext );
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
    </React.Fragment>
  );
}
