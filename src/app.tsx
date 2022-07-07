import React from 'react';
import { useQuery } from '@apollo/client';
import { Constants, Types, Queries } from '@dxtr/lib';
import { AppStateContext } from '@dxtr/redux';
import { pokemonUpdate } from '@dxtr/redux/actions';
import { Header, SearchOverlay } from '@dxtr/containers';


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
    <>
      <SearchOverlay />
      <Header />
    </>
  );
}
