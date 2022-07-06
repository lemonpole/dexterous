import React from 'react';
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, Text, IconButton, Stack, StackDivider } from '@chakra-ui/react';
import { AppStateContext } from '@dxtr/redux';
import { searchingUpdate } from '@dxtr/redux/actions';
import { Constants } from '@dxtr/lib';
import { NavBar } from '@dxtr/components';


/**
 * @component
 * @name ThemeToggleButton
 */

function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLightMode = colorMode === Constants.Application.COLOR_MODE_LIGHT;

  return (
    <IconButton
      aria-label="Toggle Dark/Light Theme"
      variant="ghost"
      onClick={toggleColorMode}
      icon={isLightMode ? <MoonIcon /> : <SunIcon />}
    />
  );
}


/**
 * @component
 * @name Header
 */

export default function Header() {
  const { dispatch } = React.useContext( AppStateContext );

  return (
    <NavBar as="header">
      {/* LOGO */}
      <Text
        fontWeight="hairline"
        letterSpacing="wide"
      >
        <b>dex</b>terous
      </Text>

      {/* SEARCH AND THEME BUTTONS */}
      <Stack
        as="article"
        direction="row"
        divider={<StackDivider />}
      >
        <IconButton
          aria-label={`Search ${Constants.Application.POKEMON_LABEL}`}
          variant="ghost"
          icon={<SearchIcon />}
          onClick={() => dispatch( searchingUpdate( true ) )}
        />
        <ThemeToggleButton />
      </Stack>
    </NavBar>
  );
}
