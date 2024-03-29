import PackageInfo from '@dxtr/package';
import { Outlet } from 'react-router-dom';
import { Constants } from '@dxtr/lib';
import { ExternalLink } from '@dxtr/components';
import { PokemonGrid } from '@dxtr/containers';
import { CheckCircleIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
  Stack,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';

/**
 * @component
 * @name Home
 */

export default function Home() {
  return (
    <Box mt={Constants.Application.HEADER_HEIGHT} px="2" py="4">
      <Outlet />

      <VStack align="flex-start">
        <Heading as="h2">Featured</Heading>
        <PokemonGrid />
      </VStack>

      <SimpleGrid spacing="5" textAlign="justify" columns={[1, null, 2]} pt="4">
        <Stack>
          <Heading as="h2">About</Heading>
          <Text>
            An <em>ad-free</em> and lightweight Pokédex.
          </Text>
          <Text>
            Contains the essentials (types, weaknesses, evolutions) and an
            intuitive interface to seamlessly navigate through Pokédex entries
            while playing your favorite Pokémon game.
          </Text>
        </Stack>
        <Stack>
          <Heading as="h2" textAlign="left">
            Support / Contributing
          </Heading>
          <List>
            <ListItem>
              <ListIcon as={InfoIcon} />
              How does it work?&nbsp;
              <ExternalLink href={PackageInfo.repository.url}>
                View the source code.
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} />
              Want to contribute?&nbsp;
              <ExternalLink href={PackageInfo.repository.url + 'pulls'}>
                Submit a Pull Request.
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} />
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
