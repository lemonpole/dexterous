import { Outlet } from 'react-router-dom';
import { Constants } from '@dxtr/lib';
import { TextLogo } from '@dxtr/components';
import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';


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
          <Text>
            TBD
          </Text>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
