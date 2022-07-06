import { ReduxActions } from './actions';
import { AppAction, AppActions, AppState, INITIAL_STATE } from './state';


function pokemon( state: typeof INITIAL_STATE.pokemon, action: AppAction<any[]> ) {
  switch( action.type ) {
    case ReduxActions.POKEMON_UPDATE:
      return action.payload as any[];
    default:
      return state;
  }
}


function filter( state: typeof INITIAL_STATE.filter, action: AppAction<string> ) {
  switch( action.type ) {
    case ReduxActions.FILTER_UPDATE:
      return action.payload as string;
    default:
      return state;
  }
}


function searching( state: typeof INITIAL_STATE.searching, action: AppAction<boolean> ) {
  switch( action.type ) {
    case ReduxActions.SEARCHING_UPDATE:
      return action.payload as boolean;
    default:
      return state;
  }
}


export default function reducers( state: AppState, action: AppActions ) {
  return ({
    pokemon: pokemon( state.pokemon, action as AppAction<any[]> ),
    filter: filter( state.filter, action as AppAction<string> ),
    searching: searching( state.searching, action as AppAction<boolean> ),
  });
}
