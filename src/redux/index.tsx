import React from 'react';
import reducers from './reducers';
import { AppDispatch, AppState, INITIAL_STATE } from './state';


export const AppStateContext = React.createContext<{ state: AppState, dispatch: AppDispatch }>({
  state: INITIAL_STATE,
  dispatch: () => null,
});


export function AppStateProvider( props: { children: React.ReactNode }) {
  const [ state, dispatch ] = React.useReducer( reducers, INITIAL_STATE );

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppStateContext.Provider>
  );
}
