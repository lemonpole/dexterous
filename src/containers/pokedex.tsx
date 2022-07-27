import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AppStateContext } from '@dxtr/redux';
import { Constants, GraphQL, util } from '@dxtr/lib';
import { ExternalLink, PokemonBadge, SpotlightImage } from '@dxtr/components';
import {
  Heading, Text, Image,
  HStack, Stack, VStack,
  Skeleton, SkeletonText,
  Alert, AlertIcon,
  SimpleGrid, Flex,
} from '@chakra-ui/react';


interface PokedexProps {
  name: string;
}


type IterablePokemonEvolutionDetails = Record<string, any> & GraphQL.Pokemon_V2_Pokemonevolution;


/**
 * Builds a single string combining all of the
 * requirements for the pokemon to evolve
 *
 * @param details The pokemon evolution conditions object.
 */

function buildEvolutionConditions( details: IterablePokemonEvolutionDetails ) {
  return Object.keys( details ).map( detailKey => {
    const detail = details[ detailKey ];
    const label = detail?.name || detail;

    if( !label || !Constants.EvolutionConditions[ detailKey ] ) {
      return null;
    }

    return util.formatString(
      Constants.EvolutionConditions[ detailKey ],
      [ label ],
    );
  });
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
 * @name PokemonEvolutionName
 */

function PokemonEvolutionName( props: { children: React.ReactNode; name: string; current: string; } ) {
  const navigate = useNavigate();

  return (
    <VStack
      onClick={() => props.name.toLowerCase() !== props.current.toLowerCase() && navigate( `/${props.name.toLowerCase()}` )}
      cursor={props.name.toLowerCase() !== props.current.toLowerCase() ? 'pointer' : 'default'}
    >
      {props.children}
    </VStack>
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
  const { data: speciesInfo } = useQuery<GraphQL.PokemonDetailsQuery, GraphQL.PokemonDetailsQueryVariables>(
    GraphQL.PokemonDetailsDocument,
    { variables: { id: basicInfo?.id || 1 } }
  );

  if( !basicInfo || !speciesInfo ) {
    return <PokedexSkeleton />;
  }

  return (
    <React.Fragment>
      <SpotlightImage pokemonId={basicInfo.id} />
      <Heading
        as="h1"
        paddingY="4"
        paddingX="2"
      >
        {props.name}
      </Heading>
      <VStack
        align="flex-start"
        paddingY="4"
        paddingX="2"
        spacing="6"
      >
        <HStack>
          {basicInfo.pokemon_v2_pokemontypes.map( type => (
            <PokemonBadge
              key={type.pokemon_v2_type?.name}
              size="sm"
              variant={type.pokemon_v2_type?.name?.toLowerCase()}
            >
              {type.pokemon_v2_type?.name}
            </PokemonBadge>
          ))}
        </HStack>

        <Stack>
          <Heading as="h3" size="md">
            Summary
          </Heading>
          <Text fontStyle="italic">
            {speciesInfo
              ?.pokemon_v2_pokemonspecies_by_pk
              ?.pokemon_v2_pokemonspeciesflavortexts[ 0 ]
              .flavor_text
              .replace( /[\n|\f]+/g, ' ' )
            }
          </Text>
          <Alert status="success" variant="left-accent">
            <AlertIcon />
            <Text fontSize="sm">
              For full details, view {basicInfo.name.toUpperCase()}'s Pokédex entry on&nbsp;
              <ExternalLink href={Constants.Application.POKEMON_DB_BASE_URL + basicInfo.name}>
                PokemonDB
              </ExternalLink>
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
                const typeMap = basicInfo.pokemon_v2_pokemontypes.map( sourceType => sourceType?.pokemon_v2_type?.name );
                const damageModifiers = pokemonType.pokemon_v2_typeefficacies.filter( targetType => typeMap.includes( targetType?.pokemonV2TypeByTargetTypeId?.name ) );

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

        <Stack width="full">
          <Heading as="h3" size="md">
            Evolutions
          </Heading>
          {speciesInfo
            .pokemon_v2_pokemonspecies_by_pk
            ?.pokemon_v2_evolutionchain
            ?.pokemon_v2_pokemonspecies_aggregate.nodes
            .map( evolution => {
              // bail early if no previous evolution exists
              const prev = state.pokemon.find( pokemon => pokemon.id === evolution.evolves_from_species_id );

              if( !prev ) {
                return null;
              }

              // grab sprite urls
              const prevSpriteUrl = util.formatString( Constants.PokemonSpriteURLs.DEFAULT, [ prev.id.toString() ]);
              const spriteUrl = util.formatString( Constants.PokemonSpriteURLs.DEFAULT, [ evolution.id.toString() ]);

              // build evolution condition string to
              // display in evolution grid below
              const [ evolutionDetails ] = evolution.pokemon_v2_pokemonevolutions_aggregate.nodes;
              const evolutionTrigger = Constants.EvolutionConditions[ evolutionDetails.pokemon_v2_evolutiontrigger?.name || '' ];
              const evolutionConditions = buildEvolutionConditions( evolutionDetails as IterablePokemonEvolutionDetails );

              return (
                <SimpleGrid
                  key={`${evolution.id}/${evolution.name}`}
                  columns={3}
                  width="full"
                >
                  <PokemonEvolutionName
                    name={prev.name}
                    current={basicInfo.name}
                  >
                    <Image
                      src={prevSpriteUrl}
                      boxSize="16"
                      objectFit="contain"
                    />
                    <Text variant="pokemon">{prev.name}</Text>
                  </PokemonEvolutionName>
                  <Flex justifyContent="center" alignItems="center">
                    <Text
                      align="center"
                      fontFamily="mono"
                      variant="muted"
                      textTransform="capitalize"
                      fontStyle="italic"
                      fontSize="sm"
                    >
                      {evolutionTrigger}&nbsp;
                      {evolutionConditions
                        .filter( condition => condition && condition.length > 0 )
                        .join( ', ' )
                        .replace( '-', ' ' )
                      }
                    </Text>
                  </Flex>
                  <PokemonEvolutionName
                    name={evolution.name}
                    current={basicInfo.name}
                  >
                    <Image
                      src={spriteUrl}
                      boxSize="16"
                      objectFit="contain"
                    />
                    <Text variant="pokemon">{evolution.name}</Text>
                  </PokemonEvolutionName>
                </SimpleGrid>
              );
            })
          }
        </Stack>
      </VStack>
    </React.Fragment>
  );
}
