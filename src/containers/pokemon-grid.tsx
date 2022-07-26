import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStateContext } from '@dxtr/redux';
import { Constants, util } from '@dxtr/lib';
import { PokemonBadge, PokemonCard } from '@dxtr/components';
import {
  Text, Image, HStack,
  Skeleton, SkeletonCircle,
  SimpleGrid,
} from '@chakra-ui/react';


const GRID_PROPS = {
  spacing: 2,
  width: 'full',
  minChildWidth: [ '150px', '250px' ],
};


/**
 * @component
 * @name PokemonGridSkeleton
 */

function PokemonGridSkeleton() {
  return (
    <SimpleGrid {...GRID_PROPS}>
      {[ ...Array( Constants.Application.POKEMON_FEATURED_NUM ) ].map( ( _, idx ) => (
        <PokemonCard key={idx}>
          <Skeleton h="20px" w="50%" />
          <Skeleton h="20px" w="30%" />
          <SkeletonCircle size="24" />
        </PokemonCard>
      ))}
    </SimpleGrid>
  );
}


/**
 * @component
 * @name PokemonGrid
 */

export default function PokemonGrid() {
  const { state } = React.useContext( AppStateContext );
  const navigate = useNavigate();

  return (
    <SimpleGrid {...GRID_PROPS}>
      {state.featured.length === 0 && (
        <PokemonGridSkeleton />
      )}
      {state.featured.map( pokemon => (
        <PokemonCard
          key={pokemon.id}
          onClick={() => navigate( `/${pokemon.name.toLowerCase()}` )}
        >
          <Text variant="pokemon">{pokemon.name}</Text>
          <HStack>
            {pokemon.pokemon_v2_pokemontypes.map( type => (
              <PokemonBadge
                key={type.pokemon_v2_type?.name}
                size="sm"
                variant={type.pokemon_v2_type?.name?.toLowerCase()}
              >
                {type.pokemon_v2_type?.name}
              </PokemonBadge>
            ))}
          </HStack>
          <Image
            boxSize="24"
            objectFit="contain"
            src={util.formatString( Constants.PokemonSpriteURLs.DEFAULT, [ pokemon.id?.toString() || '' ])}
          />
        </PokemonCard>
      ))}
    </SimpleGrid>
  );
}
