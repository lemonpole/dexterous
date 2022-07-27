import PackageInfo from '@dxtr/package';
import { Outlet } from 'react-router-dom';
import { Constants } from '@dxtr/lib';
import { ExternalLink, TextLogo } from '@dxtr/components';
import { PokemonGrid } from '@dxtr/containers';
import { CheckCircleIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Box, Heading, Text,
  List, ListIcon, ListItem,
  Stack, VStack,
  SimpleGrid,
} from '@chakra-ui/react';


/**
 * @component
 * @name Home
 */

export default function Home() {
  return (
    <Box
      mt={Constants.Application.HEADER_HEIGHT}
      px="2"
      py="4"
    >
      <Outlet />

      <VStack align="flex-start">
        <Heading as="h2">Featured</Heading>
        <PokemonGrid />
      </VStack>

      <SimpleGrid
        spacing="5"
        textAlign="justify"
        columns={[ 1, null, 2 ]}
        pt="4"
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
