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
