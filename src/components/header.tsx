import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, Stack, StackDivider, Text, useColorMode } from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';


/**
 * Header component.
 *
 * @component
 */

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      zIndex="docked"
      pos="fixed"
      top="0" left="0"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="foreground"
      borderBottom="1px"
      borderColor="inherit"
      borderStyle="solid"
      w="full"
      h={Constants.Application.HEADER_HEIGHT}
      p={Constants.Application.RYTHM_BOX}
    >
      <Text>
        <b>dex</b>terous
      </Text>
      <Stack
        as="article"
        direction="row"
        divider={<StackDivider />}
      >
        <IconButton
          aria-label={`Search ${Constants.Application.POKEMON_LABEL}`}
          variant="ghost"
          icon={<SearchIcon />}
        />
        <IconButton
          aria-label="Toggle Dark/Light Theme"
          variant="ghost"
          icon={colorMode === Constants.Application.COLOR_MODE_LIGHT
            ? <MoonIcon onClick={toggleColorMode} />
            : <SunIcon onClick={toggleColorMode} />
          }
        />
      </Stack>
    </Box>
  );
}
