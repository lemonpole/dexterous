import { Pokemon, Type as MoveType, Version as GameVersion } from 'pokenode-ts';
import { AppAction, INITIAL_STATE } from './state';
import { Constants } from '../lib';


export function themeReducer( state: typeof INITIAL_STATE.theme, action: AppAction<boolean> ) {
  switch( action.type ) {
    case Constants.ReduxActions.THEME_UPDATE:
      localStorage.setItem( Constants.Application.LOCAL_STORAGE_THEME_KEY, JSON.stringify( action.payload ) );
      return action.payload as boolean;
    default:
      return state;
  }
}


export function pokemonReducer( state: typeof INITIAL_STATE.pokemon, action: AppAction<Pokemon[]> ) {
  switch( action.type ) {
    case Constants.ReduxActions.POKEMON_UPDATE:
      return action.payload as Pokemon[];
    default:
      return state;
  }
}


export function moveTypeReducer( state: typeof INITIAL_STATE.moveTypes, action: AppAction<MoveType[]> ) {
  switch( action.type ) {
    case Constants.ReduxActions.MOVE_TYPES_UPDATE:
      return action
        .payload?.filter( moveType => !Constants.Application.IGNORED_MOVE_TYPES.includes( moveType.name ) ) as MoveType[];
    default:
      return state;
  }
}


export function gameVersionReducer( state: typeof INITIAL_STATE.gameVersions, action: AppAction<GameVersion[]> ) {
  switch( action.type ) {
    case Constants.ReduxActions.GAME_VERSIONS_UPDATE:
      return action.payload as GameVersion[];
    default:
      return state;
  }
}


export function cacheLoadedReducer( state: typeof INITIAL_STATE.cacheLoaded, action: AppAction<boolean> ) {
  switch( action.type ) {
    case Constants.ReduxActions.CACHE_LOADED_UPDATE:
      localStorage.setItem( Constants.Application.LOCAL_STORAGE_CACHE_LOADED_KEY, JSON.stringify( action.payload ) );
      return action.payload as boolean;
    default:
      return state;
  }
}
