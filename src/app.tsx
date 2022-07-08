import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Constants, Types, Queries } from '@dxtr/lib';
import { AppStateContext } from '@dxtr/redux';
import { pokemonUpdate } from '@dxtr/redux/actions';
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
  const { data, loading } = useQuery<Types.PokemonResponse, Types.PokemonRequestVars>(
    Queries.GET_POKEMON,
    { variables: { limit: Constants.Application.POKEMON_INITIAL_LIMIT_NUM } }
  );

  // load into redux state
  React.useEffect( () => {
    if( data && !loading ) {
      dispatch( pokemonUpdate( data.pokemon_v2_pokemon ) );
    }
  }, [ dispatch, data, loading ]);

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
