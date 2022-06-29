import React from 'react';
import classNames from 'classnames';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@blueprintjs/core';
import { Pokemon, Type as MoveType, Version as GameVersion } from 'pokenode-ts';
import { AppStateContext } from 'redux/context';
import { Home, Poke } from 'pages';
import { Constants, API } from 'lib';
import { DeviceDetector, Header } from 'components';


export default function App() {
  // set up component state
  const { state, dispatch } = React.useContext( AppStateContext );
  const [ filter, setFilter ] = React.useState<string>();
  const [ isActiveSearch, setIsActiveSearch ] = React.useState( false );
  const location = useLocation();
  const navigate = useNavigate();

  // reset search form state when transitioning through pages
  React.useEffect( () => {
    setFilter( '' );
    setIsActiveSearch( false );
  }, [ location ]);

  // fetch all pokemon and their details
  React.useEffect( () => {
    API
      .getPokemonClient()
      .listPokemons( Constants.Application.POKEMON_INITIAL_OFFSET_NUM, Constants.Application.POKEMON_INITIAL_LIMIT_NUM )
      .then( res => Promise.all( res.results.map( item => API.getPokemonClient().getPokemonByName( item.name ) ) ) )
      .then( res => dispatch({ type: Constants.ReduxActions.POKEMON_UPDATE, payload: res as Pokemon[] }) )
      .catch( () => null )
    ;

    API
      .getPokemonClient()
      .listTypes()
      .then( res => Promise.all( res.results.map( item => API.getPokemonClient().getTypeByName( item.name ) ) ) )
      .then( res => dispatch({ type: Constants.ReduxActions.MOVE_TYPES_UPDATE, payload: res as MoveType[] }) )
    ;

    API
      .getGameClient()
      .listVersions( Constants.Application.POKEMON_INITIAL_OFFSET_NUM, Constants.Application.POKEMON_INITIAL_LIMIT_NUM )
      .then( res => Promise.all( res.results.map( item => API.getGameClient().getVersionByName( item.name ) ) ) )
      .then( res => dispatch({ type: Constants.ReduxActions.GAME_VERSIONS_UPDATE, payload: res as GameVersion[] }) )
    ;
  }, [ dispatch ]);

  // toggle first run flag off once pokemon list is loaded
  React.useEffect( () => {
    if( state.pokemon && state.pokemon.length === Constants.Application.POKEMON_INITIAL_LIMIT_NUM ) {
      dispatch({ type: Constants.ReduxActions.FIRST_RUN_UPDATE, payload: false });
    }
  }, [ state.pokemon, dispatch ]);

  // render our markup
  return (
    <div
      id="app"
      className={classNames({ 'bp4-dark': state.theme })}
    >
      <Header
        isDarkTheme={state.theme}
        isActiveSearch={isActiveSearch}
        searchBarValue={filter}
        showBackButton={location.pathname !== '/'}
        onThemeChange={() => dispatch({ type: Constants.ReduxActions.THEME_UPDATE, payload: !state.theme })}
        onBackButtonClick={() => navigate( '/' )}
        onSearchBarChange={setFilter}
        onSearchBarClick={() => setIsActiveSearch( !isActiveSearch )}
      />

      {/* RENDER ROUTE HIERARCHY FOR DESKTOP */}
      <DeviceDetector.DesktopView>
        <Routes>
          <Route path="/" element={<Home filter={filter} />}>
            <Route path=":name" element={<Poke />} />
          </Route>
        </Routes>
      </DeviceDetector.DesktopView>

      {/* RENDER ROUTE HIERARCHY FOR MOBILE */}
      <DeviceDetector.MobileView>
        <Routes>
          <Route path="/" element={<Home filter={filter} />} />
          <Route path=":name" element={<Poke filter={filter} />} />
        </Routes>
      </DeviceDetector.MobileView>

      {/* RENDER FOOTER SO WE DON'T GET SUED */}
      <Navbar id="footer">
        <Navbar.Group>
          <p>
            {'An '} <a href="https://github.com/lemonpole/dexterous" target="_blank" rel="noreferrer">{'open source '}</a>
            {'Pokédex built using '} <a href="https://pokeapi.co" target="_blank" rel="noreferrer">{'PokéAPI'}</a>.
          </p>
          <p>
            {'All content is © Nintendo, Game Freak, and The Pokémon Company.'}
          </p>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}
