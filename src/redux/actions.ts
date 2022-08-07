import { AppState } from './state';


export const ReduxActions = {
  FEATURED_UPDATE                 : '/featured/update',
  FILTER_UPDATE                   : '/filter/update',
  POKEMON_UPDATE                  : '/pokemon/update',
  POKEMON_GENERATIONS_UPDATE      : '/pokemon/generations/update',
  POKEMON_TYPES_UPDATE            : '/pokemon/types/update',
  SEARCHING_UPDATE                : '/searching/update',
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


export function pokemonGenerationsUpdate( payload: AppState['pokemonGenerations'] ) {
  return {
    type: ReduxActions.POKEMON_GENERATIONS_UPDATE,
    payload
  };
}


export function pokemonUpdate( payload: AppState['pokemon'] ) {
  return {
    type: ReduxActions.POKEMON_UPDATE,
    payload
  };
}


export function pokemonTypesUpdate( payload: AppState['pokemonTypes'] ) {
  return {
    type: ReduxActions.POKEMON_TYPES_UPDATE,
    payload
  };
}


export function featuredUpdate( payload: AppState['featured'] ) {
  return {
    type: ReduxActions.FEATURED_UPDATE,
    payload
  };
}
