import React from 'react';
import PackageInfo from '@dxtr/package';
import { Outlet } from 'react-router-dom';
import { Constants } from '@dxtr/lib';
import { ExternalLink } from '@dxtr/components';
import { PokemonGrid } from '@dxtr/containers';
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Stack,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';

/**
 * The welcome component contains the about and info blurbs.
 *
 * @function
 */
function Welcome() {
  return (
    <React.Fragment>
      <Stack>
        <Heading as="h2">About</Heading>
        <Text>
          An <em>ad-free</em> and lightweight Pokédex.
        </Text>
        <Text>
          Offers a sleek, intuitive interface for effortlessly navigating
          Pokémon entries while you play your favorite Pokémon game.
        </Text>
        <Text>
          Get all the essentials—types, weaknesses, and evolutions—to master
          battles and plan your evolutions with ease.
        </Text>
      </Stack>
      <Stack>
        <Heading as="h2">Info</Heading>
        <List spacing="2">
          <ListItem>
            ✅ How does it work?&nbsp;
            <ExternalLink href={PackageInfo.repository.url}>
              View the source code.
            </ExternalLink>
          </ListItem>
          <ListItem>
            🤝 Want to contribute?&nbsp;
            <ExternalLink href={PackageInfo.repository.url + 'pulls'}>
              Submit a Pull Request.
            </ExternalLink>
          </ListItem>
          <ListItem>
            🐛 Found a bug?&nbsp;
            <ExternalLink href={PackageInfo.bugs.url}>
              Please file an issue.
            </ExternalLink>
          </ListItem>
        </List>
      </Stack>
    </React.Fragment>
  );
}

/**
 * The home component.
 *
 * @function
 * @exports
 */
export default function Home() {
  return (
    <Box mt={Constants.Application.HEADER_HEIGHT} px="2" py="4">
      <Outlet />

      <SimpleGrid spacing="5" columns={{ sm: 1, xl: 2 }}>
        <VStack align="flex-start">
          <Heading as="h2">Featured</Heading>
          <PokemonGrid />
        </VStack>
        <VStack align="flex-start" gap="5">
          <Welcome />
        </VStack>
      </SimpleGrid>
    </Box>
  );
}
