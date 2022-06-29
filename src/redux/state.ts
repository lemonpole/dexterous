import { Pokemon, Type as MoveType, Version as GameVersion } from 'pokenode-ts';
import { Constants } from '../lib';


export interface AppState {
  pokemon: Pokemon[];
  theme: boolean;
  moveTypes: MoveType[];
  gameVersions: GameVersion[];
  firstRun: boolean;
}


export interface AppAction<T> {
  type: string;
  payload?: T
}


export type AppDispatch = React.Dispatch<
  AppAction<boolean>
  | AppAction<Pokemon[]>
  | AppAction<MoveType[]>
  | AppAction<GameVersion[]>
>;


export const INITIAL_STATE: AppState = {
  pokemon: [],
  theme: localStorage.getItem( Constants.Application.LOCAL_STORAGE_THEME_KEY ) === 'true',
  moveTypes: [],
  gameVersions: [],
  firstRun: localStorage.getItem( Constants.Application.LOCAL_STORAGE_FIRST_RUN_KEY ) === 'false' || !localStorage.getItem( Constants.Application.LOCAL_STORAGE_FIRST_RUN_KEY ),
}
