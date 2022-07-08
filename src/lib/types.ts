export type GenericGraphQLResponse<RootKey extends keyof any, T> = {[ Key in RootKey ]: T};
export type PokemonTypeResponse = GenericGraphQLResponse<'pokemon_v2_type', PokemonType>;
export type PokemonResponse = GenericGraphQLResponse<'pokemon_v2_pokemon', Pokemon[]>;
export type PokemonSpeciesResponse = GenericGraphQLResponse<'pokemon_v2_pokemonspecies_by_pk', PokemonSpecies>;


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


export interface PokemonSpecies {
  name: string;
  pokemon_v2_pokemonspeciesflavortexts: PokemonSpeciesFlavorText[];
}


export interface PokemonSpeciesFlavorText {
  flavor_text: string;
}


export interface PokemonSpeciesRequestVars {
  id: number;
  lang?: string;
}
