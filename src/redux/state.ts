import { GraphQL } from '@dxtr/lib';


export interface AppState {
  filter: string;
  pokemon: GraphQL.PokemonQuery['pokemon_v2_pokemon']
  pokemonTypes: GraphQL.PokemonTypesQuery['pokemon_v2_type'];
  searching: boolean;
}


export interface AppAction<T> {
  type: string;
  payload?: T
}


export type AppActions = AppAction<AppState[keyof AppState]>;
export type AppDispatch = React.Dispatch<AppActions>;


export const INITIAL_STATE: AppState = {
  filter: '',
  pokemon: [],
  pokemonTypes: [],
  searching: false,
};
