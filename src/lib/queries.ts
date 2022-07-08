import { gql } from '@apollo/client';


export const GET_POKEMON = gql`
  query getAllPokemon( $limit: Int! ) {
    pokemon_v2_pokemon( limit: $limit ) {
      id
      name
      pokemon_species_id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
          name
        }
      }
    }
  }
`;


export const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails( $id: Int!, $lang: String = "en" ) {
    pokemon_v2_pokemonspecies_by_pk( id: $id ) {
      pokemon_v2_pokemonspeciesflavortexts(
        where: { pokemon_v2_language: { name: { _eq: $lang } } },
        limit: 1
      ) {
        flavor_text
      }
    }
  }
`;
