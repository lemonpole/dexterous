import PackageInfo from '@dxtr/package';
import { Outlet } from 'react-router-dom';
import { Constants } from '@dxtr/lib';
import { ExternalLink, TextLogo } from '@dxtr/components';
import { BellIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, List, ListIcon, ListItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';


/**
 * @component
 * @name Home
 */

export default function Home() {
  return (
    <Box>
      <Outlet />

      <SimpleGrid
        spacing="10"
        textAlign="justify"
        columns={[ 1, null, 2 ]}
        marginTop={Constants.Application.HEADER_HEIGHT}
        // fill content to make footer stick
        // to the bottom of the page
        minH={`calc(100vh - ${Constants.Application.HEADER_HEIGHT} - ${Constants.Application.FOOTER_HEIGHT})`}
      >
        <Stack>
          <Heading as="h2">
            About
          </Heading>
          <Text>
            <TextLogo /> was created from a specific
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
          <Heading as="h2">
            Support / Contributing
          </Heading>
          <List>
            <ListItem>
              <ListIcon as={EditIcon} />
              Want to contribute?&nbsp;
              <ExternalLink href={PackageInfo.repository.url + '/pulls'}>
                Submit a Pull Request.
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ListIcon as={BellIcon} />
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
