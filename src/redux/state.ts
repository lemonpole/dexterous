import { GraphQL } from '@dxtr/lib';

export interface AppState {
  featured: GraphQL.PokemonQuery['pokemon_v2_pokemon'];
  filter: string;
  pokemon: GraphQL.PokemonQuery['pokemon_v2_pokemon'];
  pokemonGenerations: GraphQL.PokemonGenerationsQuery['pokemon_v2_generation'];
  pokemonTypes: GraphQL.PokemonTypesQuery['pokemon_v2_type'];
  searching: boolean;
}

export interface AppAction<T> {
  type: string;
  payload?: T;
}

export type AppActions = AppAction<AppState[keyof AppState]>;
export type AppDispatch = React.Dispatch<AppActions>;

export const INITIAL_STATE: AppState = {
  featured: [],
  filter: '',
  pokemon: [],
  pokemonGenerations: [],
  pokemonTypes: [],
  searching: false,
};
