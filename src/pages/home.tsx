import React from 'react';
import PackageInfo from '@dxtr/package';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppStateContext } from '@dxtr/redux';
import { Constants, util } from '@dxtr/lib';
import { ExternalLink, PokemonBadge, TextLogo } from '@dxtr/components';
import { CheckCircleIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Box, Heading, Text, Image,
  List, ListIcon, ListItem,
  Stack, HStack, VStack,
  Skeleton, SkeletonCircle,
  SimpleGrid,
} from '@chakra-ui/react';


/**
 * Local module function to randomly generate a number
 * between the specified min and max limits.
 */

function random( min: number, max: number ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}


/**
 * @component
 * @name PokemonListSkeleton
 */

 function PokemonListSkeleton() {
  return (
    <SimpleGrid
      spacing="10"
      width="full"
      minChildWidth={[ '150px', '250px' ]}
    >
      {[ ...Array( 8 ) ].map( ( _, idx ) => (
        <Stack
          key={idx}
          align="center"
          justify="center"
          cursor="pointer"
          bg="foreground"
          boxShadow="md"
          height="220px"
          border="1px"
          borderColor="chakra-border-color"
        >
          <Skeleton h="20px" w="50%" />
          <Skeleton h="20px" w="30%" />
          <SkeletonCircle size="24" />
        </Stack>
      ))}
    </SimpleGrid>
  );
}


/**
 * @component
 * @name Home
 */

export default function Home() {
  const { state } = React.useContext( AppStateContext );
  const navigate = useNavigate();

  const featuredIds = React.useMemo( () =>
    [ ...Array( 8 ) ].map( () => random( 1, state.pokemon.length - 1 ) ),
    [ state.pokemon ]
  );

  const featuredList = React.useMemo( () =>
    state.pokemon.filter( pokemon => featuredIds.includes( pokemon.id ) ),
    [ state.pokemon, featuredIds ]
  );

  return (
    <Box paddingX="2">
      <Outlet />

      <VStack
        align="flex-start"
        marginTop={Constants.Application.HEADER_HEIGHT}
        paddingY="10"
      >
        <Heading as="h2">Featured</Heading>
        <SimpleGrid
          spacing="10"
          width="full"
          minChildWidth={[ '150px', '250px' ]}
        >
          {featuredList.length === 0 && <PokemonListSkeleton />}
          {featuredList.map( pokemon => (
            <Stack
              key={pokemon.id}
              align="center"
              justify="center"
              cursor="pointer"
              bg="foreground"
              boxShadow="md"
              height="220px"
              border="1px"
              borderColor="chakra-border-color"
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
            </Stack>
          ))}
        </SimpleGrid>
      </VStack>

      <SimpleGrid
        spacing="10"
        textAlign="justify"
        columns={[ 1, null, 2 ]}
      >
        <Stack>
          <Heading as="h2">
            About
          </Heading>
          <Text>
            This Pokédex was created from a specific
            need to quickly look up the types or weaknesses
            of a Pokémon while in the heat of battle.
          </Text>
          <Text>
            There are many great <b>(and free)</b> solutions out there
            but none focus their user experience around quickly
            searching or navigating through Pokédex entries.
          </Text>
          <Text>
            The few mobile apps that exist, work well but hide much
            of their functionality behind <b>paid features</b> or
            force their users to watch <b>unskippable</b> ads.
          </Text>
          <Text>
            Thus, <TextLogo /> was born. No ads. No gimmicks.
          </Text>
        </Stack>
        <Stack>
          <Heading as="h2" textAlign="left">
            Support / Contributing
          </Heading>
          <List>
            <ListItem>
              <ListIcon as={InfoIcon} color="brand.300" />
              How does it work?&nbsp;
              <ExternalLink href={PackageInfo.repository.url}>
                View the source code.
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="brand.300" />
              Want to contribute?&nbsp;
              <ExternalLink href={PackageInfo.repository.url + 'pulls'}>
                Submit a Pull Request.
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} color="brand.300" />
              Found a bug?&nbsp;
              <ExternalLink href={PackageInfo.bugs.url}>
                Please file an issue.
              </ExternalLink>
            </ListItem>
          </List>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
