import React from 'react';
import { useQuery } from '@apollo/client';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { AppStateContext } from '@dxtr/redux';
import { Constants, Queries, Types } from '@dxtr/lib';
import { PokemonBadge, SpotlightImage } from '@dxtr/components';
import {
  Heading, Text,
  HStack, Stack, VStack,
  Skeleton, SkeletonText, Alert, AlertIcon, Link
} from '@chakra-ui/react';


interface PokemonDetailsProps {
  name: string;
}


function PokemonDetailsSkeleton() {
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
 * @name PokemonDetails
 */

export default function PokemonDetails( props: PokemonDetailsProps ) {
  const { state } = React.useContext( AppStateContext );
  const basicInfo = state.pokemon.find( pokemon => pokemon.name.toLowerCase() === props.name.toLowerCase() );

  // load pokemon species details
  const { data: speciesInfo, loading: speciesInfoLoading } = useQuery<Types.PokemonSpeciesResponse, Types.PokemonSpeciesRequestVars>(
    Queries.GET_POKEMON_DETAILS,
    { variables: { id: basicInfo?.id || 1 } }
  );

  if( speciesInfoLoading || !basicInfo || !speciesInfo ) {
    return <PokemonDetailsSkeleton />;
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
      </VStack>
    </React.Fragment>
  );
}
