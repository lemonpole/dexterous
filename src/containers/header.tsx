import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useColorMode,
  IconButton,
  Stack,
  StackDivider,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaHome, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { AppStateContext } from '@dxtr/redux';
import { searchingUpdate } from '@dxtr/redux/actions';
import { Constants } from '@dxtr/lib';
import { NavBar, TextLogo } from '@dxtr/components';

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
      icon={isLightMode ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
    />
  );
}

/**
 * @component
 * @name Header
 */

export default function Header() {
  const { dispatch } = React.useContext(AppStateContext);
  const navigate = useNavigate();

  return (
    <NavBar as="header" variant="header">
      {/* LOGO */}
      <TextLogo />

      {/* SEARCH AND THEME BUTTONS */}
      <Stack as="article" direction="row" divider={<StackDivider />}>
        <HStack as="aside">
          <IconButton
            aria-label={`Search ${Constants.Application.POKEMON_LABEL}`}
            variant="ghost"
            icon={<Icon as={FaSearch} />}
            onClick={() => dispatch(searchingUpdate(true))}
          />
          <ThemeToggleButton />
        </HStack>
        <IconButton
          aria-label="Home"
          variant="ghost"
          icon={<Icon as={FaHome} />}
          onClick={() => navigate('/')}
        />
      </Stack>
    </NavBar>
  );
}
