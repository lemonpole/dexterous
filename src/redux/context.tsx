import React from 'react';
import { Pokemon, Type as MoveType, Version as GameVersion } from 'pokenode-ts';
import { AppAction, AppDispatch, AppState, INITIAL_STATE } from './state';
import { pokemonReducer, themeReducer, moveTypeReducer, gameVersionReducer, firstRunReducer } from './reducers';


function appReducer( state: AppState, action: AppAction<boolean> | AppAction<Pokemon[]> | AppAction<MoveType[]> | AppAction<GameVersion[]> ) {
  return ({
    pokemon: pokemonReducer( state.pokemon, action as AppAction<Pokemon[]> ),
    theme: themeReducer( state.theme, action as AppAction<boolean> ),
    moveTypes: moveTypeReducer( state.moveTypes, action as AppAction<MoveType[]> ),
    gameVersions: gameVersionReducer( state.gameVersions, action as AppAction<GameVersion[]> ),
    firstRun: firstRunReducer( state.firstRun, action as AppAction<boolean> ),
  });
}


export const AppStateContext = React.createContext<{ state: AppState, dispatch: AppDispatch }>({
  state: INITIAL_STATE,
  dispatch: () => null,
});


export function AppStateProvider( props: { children: React.ReactNode }) {
  const [ state, dispatch ] = React.useReducer( appReducer, INITIAL_STATE );

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppStateContext.Provider>
  );
}
