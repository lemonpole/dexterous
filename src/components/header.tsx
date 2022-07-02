import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, IconButton, Text, useColorMode } from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';


/**
 * Header component.
 *
 * @component
 */

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      h={Constants.Theme.HEADER_HEIGHT}
      p={5}
    >
      <Box>
        <Text>
          <b>dex</b>terous
        </Text>
      </Box>
      <Flex align="center" h="100%" gap="5">
        <Divider orientation="vertical"/>
        <IconButton
          aria-label={`Search ${Constants.Application.POKEMON_LABEL}`}
          variant="ghost"
          icon={colorMode === Constants.Theme.MODE_LIGHT
            ? <MoonIcon onClick={toggleColorMode} />
            : <SunIcon onClick={toggleColorMode} />
          }
        />
      </Flex>
    </Flex>
  );
}
