import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Outlet, useNavigate } from 'react-router-dom';
import { Constants } from '../lib';
import { PokeList } from '../components';
import { AppStateContext } from '../redux/context';
import { Callout, ProgressBar } from '@blueprintjs/core';


interface HomeProps {
  filter?: string;
}


export default function Home( props: HomeProps ) {
  // set up component state
  const { state } = React.useContext( AppStateContext );
  const [ page, setPage ] = React.useState( 0 );
  const [ hasMore, setHasMore ] = React.useState( false );
  const navigate = useNavigate();

  // calculate the current batch for lazy loading
  const batch = React.useMemo( () => {
    const offset = page * Constants.Application.POKEMON_PER_PAGE;
    const limit = offset + Constants.Application.POKEMON_PER_PAGE;
    const remaining = state.pokemon.slice( offset );

    if( remaining.length > Constants.Application.POKEMON_PER_PAGE ) {
      setHasMore( true );
      return state.pokemon.slice( 0, limit );
    }

    setHasMore( false );
    return state.pokemon;
  }, [ page, state.pokemon ]);

  return (
    <div id="home" className="container">
      {/* SHOW FIRST RUN CACHE NOTICE */}
      {!state.cacheLoaded && (
        <section id="cache-notice">
          <Callout
            title={'Creating cache'}
            intent="primary"
            icon="info-sign"
          >
            <p>{'Welcome! Since this is your first time, please give us a minute while the list of Pokémon is generated. There are a lot!'}</p>
            <p>{'After this is completed this message will automatically go away.'}</p>
            <ProgressBar intent="primary" />
          </Callout>
        </section>
      )}

      {/* LAZY LOAD THE ENTIRE POKEMON LIST WHEN A FILTER IS APPLIED */}
      {!props.filter && (
        <InfiniteScroll
          loadMore={setPage}
          hasMore={hasMore}
        >
          <PokeList
            data={batch}
            onClick={pokemon => navigate( `/${pokemon.name}` )}
          />
        </InfiniteScroll>
      )}

      {/* SHOW THE FILTERED LIST WHEN A FILTER IS APPLIED */}
      {!!props.filter && (
        <PokeList
          data={state.pokemon.filter( pokemon => pokemon.name.toLowerCase().indexOf( props.filter?.toLowerCase() || '' ) >= 0 )}
          onClick={pokemon => navigate( `/${pokemon.name}` )}
        />
      )}

      {/* RENDER NESTED ROUTES */}
      <Outlet />
    </div>
  );
}
