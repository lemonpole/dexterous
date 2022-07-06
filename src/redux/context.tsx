import React from 'react';
import { AppAction, AppDispatch, AppState, INITIAL_STATE } from './state';
import * as reducers from './reducers';


function appReducer( state: AppState, action: AppAction<any[]> ) {
  return ({
    pokemon: reducers.pokemon( state.pokemon, action as AppAction<any[]> ),
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
