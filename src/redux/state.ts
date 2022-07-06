import { PokemonSampleData } from '@dxtr/lib/util';


export interface AppState {
  pokemon: any[];
  filter: string;
  searching: boolean;
}


export interface AppAction<T> {
  type: string;
  payload?: T
}


export type AppActions = (
  AppAction<any[]>
  | AppAction<string>
  | AppAction<boolean>
);


export type AppDispatch = React.Dispatch<AppActions>;


export const INITIAL_STATE: AppState = {
  pokemon: PokemonSampleData,
  filter: '',
  searching: false,
};
