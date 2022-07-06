import { PokemonSampleData } from '@dxtr/lib/util';


export interface AppState {
  pokemon: any[];
}


export interface AppAction<T> {
  type: string;
  payload?: T
}


export type AppDispatch = React.Dispatch<AppAction<any[]>>;


export const INITIAL_STATE: AppState = {
  pokemon: PokemonSampleData,
};
