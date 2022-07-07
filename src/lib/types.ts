export type GenericGraphQLResponse<RootKey extends keyof any, T> = {[ Key in RootKey ]: T};
export type PokemonTypeResponse = GenericGraphQLResponse<'pokemon_v2_type', PokemonType>;
export type PokemonResponse = GenericGraphQLResponse<'pokemon_v2_pokemon', Pokemon[]>;


export interface PokemonRequestVars {
  limit: number;
}


export interface PokemonType {
  id: number;
  name: string;
}


export interface Pokemon {
  id: number;
  name: string;
  pokemon_species_id: number;
  pokemon_v2_pokemontypes: PokemonTypeResponse[];
}
