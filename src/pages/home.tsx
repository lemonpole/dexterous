import PackageInfo from '@dxtr/package';
import { Outlet } from 'react-router-dom';
import { Constants } from '@dxtr/lib';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';


/**
 * @component
 * @name Home
 */

export default function Home() {
  return (
    <Box>
      <Outlet />

      <Stack marginTop={Constants.Application.HEADER_HEIGHT}>
        <Heading as="h1">
          About
        </Heading>
        <Text>
          {PackageInfo.name} was created from a specific
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
          Thus, {PackageInfo.name} was born. No ads. No gimmicks.
        </Text>
      </Stack>
    </Box>
  );
}
