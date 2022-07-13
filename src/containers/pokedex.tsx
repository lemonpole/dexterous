import React from 'react';
import { useQuery } from '@apollo/client';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { AppStateContext } from '@dxtr/redux';
import { Constants, Queries, Types, util } from '@dxtr/lib';
import { PokemonBadge, SpotlightImage } from '@dxtr/components';
import {
  Heading, Link, Text,
  HStack, Stack, VStack,
  Skeleton, SkeletonText,
  Alert, AlertIcon,
  SimpleGrid
} from '@chakra-ui/react';


interface PokedexProps {
  name: string;
}


/**
 * @component
 * @name PokedexSkeleton
 */

function PokedexSkeleton() {
  return (
    <React.Fragment>
      <Skeleton>
        <SpotlightImage />
      </Skeleton>
      <SkeletonText
        margin="4"
        noOfLines={4}
        spacing="4"
        skeletonHeight="4"
      />
    </React.Fragment>
  );
}


/**
 * @component
 * @name Pokedex
 */

export default function Pokedex( props: PokedexProps ) {
  const { state } = React.useContext( AppStateContext );
  const basicInfo = state.pokemon.find( pokemon => pokemon.name.toLowerCase() === props.name.toLowerCase() );

  // load pokemon species details
  const { data: speciesInfo, loading: speciesInfoLoading } = useQuery<Types.PokemonSpeciesResponse, Types.PokemonSpeciesRequestVars>(
    Queries.GET_POKEMON_DETAILS,
    { variables: { id: basicInfo?.id || 1 } }
  );

  if( speciesInfoLoading || !basicInfo || !speciesInfo ) {
    return <PokedexSkeleton />;
  }

  return (
    <React.Fragment>
      <SpotlightImage pokemonId={basicInfo.id} />
      <Heading
        as="h1"
        paddingY="4"
        paddingX="6"
      >
        {props.name}
      </Heading>
      <VStack
        align="flex-start"
        paddingY="2"
        paddingX="6"
        spacing="6"
      >
        <HStack>
          {basicInfo.pokemon_v2_pokemontypes.map( type => (
            <PokemonBadge
              key={type.pokemon_v2_type.name}
              size="sm"
              variant={type.pokemon_v2_type.name.toLowerCase()}
            >
              {type.pokemon_v2_type.name}
            </PokemonBadge>
          ))}
        </HStack>

        <Stack>
          <Heading as="h3" size="md">
            Summary
          </Heading>
          <Text fontStyle="italic">
            {speciesInfo
              .pokemon_v2_pokemonspecies_by_pk
              .pokemon_v2_pokemonspeciesflavortexts[ 0 ]
              .flavor_text
              .replace( /[\n|\f]+/g, ' ' )
            }
          </Text>
          <Alert status="success" variant="left-accent">
            <AlertIcon />
            <Text fontSize="sm">
              For full details, view {basicInfo.name.toUpperCase()}'s Pokédex entry on&nbsp;
              <Link isExternal href={Constants.Application.POKEMON_DB_BASE_URL + basicInfo.name}>
                PokemonDB
                <ExternalLinkIcon mx='1' />
              </Link>
            </Text>
          </Alert>
        </Stack>

        <Stack width="full">
          <Heading as="h3" size="md">
            Type Defenses
          </Heading>
          <SimpleGrid minChildWidth="50%" width="full">
            {state
              .pokemonTypes
              .map( pokemonType => {
                // grab the types that the current
                // pokemon is weak/immune to
                const typeMap = basicInfo.pokemon_v2_pokemontypes.map( sourceType => sourceType.pokemon_v2_type.name );
                const damageModifiers = pokemonType.pokemon_v2_typeefficacies.filter( targetType => typeMap.includes( targetType.pokemonV2TypeByTargetTypeId.name ) );

                // calculate the total damage modifier
                const total = util.calculateDamageModifier( damageModifiers );
                return { pokemonType, total };
              })
              .sort( ( a, b ) => b.total - a.total )
              .map( damage => {
                // skip normal damage
                if( damage.total === 1 ) {
                  return null;
                }

                return (
                  <HStack key={damage.pokemonType.id} width="full" height="10">
                    <Text w="50%" h="full" lineHeight="10" variant={damage.pokemonType.name.toLowerCase()}>{damage.pokemonType.name}</Text>
                    <Text w="50%" h="full" lineHeight="10" variant={damage.total.toString()} textAlign="center" fontFamily="mono">{damage.total}x</Text>
                  </HStack>
                )
              })
            }
          </SimpleGrid>
        </Stack>
      </VStack>
    </React.Fragment>
  );
}
