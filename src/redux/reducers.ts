import { Constants } from '@dxtr/lib';
import { AppAction, INITIAL_STATE } from './state';


export function pokemon( state: typeof INITIAL_STATE.pokemon, action: AppAction<any[]> ) {
  switch( action.type ) {
    case Constants.ReduxActions.POKEMON_UPDATE:
      return action.payload as any[];
    default:
      return state;
  }
}
