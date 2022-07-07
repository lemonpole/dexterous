import { AppState } from './state';


export const ReduxActions = {
  FILTER_UPDATE     : '/filter/update',
  POKEMON_UPDATE    : '/pokemon/update',
  SEARCHING_UPDATE  : '/searching/update',
};


export function searchingUpdate( payload: AppState['searching'] ) {
  return {
    type: ReduxActions.SEARCHING_UPDATE,
    payload
  };
}


export function filterUpdate( payload: AppState['filter'] ) {
  return {
    type: ReduxActions.FILTER_UPDATE,
    payload
  };
}


export function pokemonUpdate( payload: AppState['pokemon'] ) {
  return {
    type: ReduxActions.POKEMON_UPDATE,
    payload
  };
}
