import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Constants } from '@dxtr/lib';
import { Header, SearchOverlay } from '@dxtr/containers';


interface PokemonType {
  id: number;
  name: string;
}


interface PokemonTypeData {
  pokemon_v2_type: PokemonType;
}


interface Pokemon {
  id: number;
  name: string;
  pokemon_species_id: number;
  pokemon_v2_pokemontypes: PokemonTypeData[];
}


interface PokemonData {
  pokemon_v2_pokemon: Pokemon[];
}


interface PokemonDataVars {
  limit: number;
}


/**
 * @constant
 */

const GET_POKEMON = gql`
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


/**
 * @component
 * @name App
 */

export default function App() {
  const { data } = useQuery<PokemonData, PokemonDataVars>(
    GET_POKEMON,
    { variables: { limit: Constants.Application.POKEMON_INITIAL_LIMIT_NUM } }
  );

  React.useEffect( () => {
    // @todo: - move queries to their own `*.gql` files.
    //        - sprites gql broken, so build the url ourselves
    //          - https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
    //          - https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png
    console.log( data );
  }, [ data ]);

  return (
    <>
      <SearchOverlay />
      <Header />
    </>
  );
}
