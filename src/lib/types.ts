/**
 * GraphQL response structures.
 */

export type GenericGraphQLResponse<RootKey extends keyof any, T> = {[ Key in RootKey ]: T};
export type PokemonResponse = GenericGraphQLResponse<'pokemon_v2_pokemon', Pokemon[]>;
export type PokemonTypeResponse = GenericGraphQLResponse<'pokemon_v2_type', PokemonType>;
export type PokemonTypesResponse = GenericGraphQLResponse<'pokemon_v2_type', PokemonType[]>;
export type PokemonSpeciesResponse = GenericGraphQLResponse<'pokemon_v2_pokemonspecies_by_pk', PokemonSpecies>;

interface GenericAPIResource {
  id: number;
  name: string;
}


/**
 * Request variables.
 */

export interface PokemonRequestVars {
  limit: number;
}


export interface PokemonSpeciesRequestVars {
  id: number;
  lang?: string;
}


/**
 * Data structures.
 */

export interface Pokemon extends GenericAPIResource {
  pokemon_species_id: number;
  pokemon_v2_pokemontypes: PokemonTypeResponse[];
}


export interface PokemonType extends GenericAPIResource {
  pokemon_v2_typeefficacies: PokemonEfficacy[];
}


export interface PokemonSpecies {
  name: string;
  pokemon_v2_pokemonspeciesflavortexts: PokemonSpeciesFlavorText[];
}


export interface PokemonSpeciesFlavorText {
  flavor_text: string;
}


export interface PokemonEfficacy {
  id: number;
  damage_factor: number;
  pokemonV2TypeByTargetTypeId: GenericAPIResource;
}
