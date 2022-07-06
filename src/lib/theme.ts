/**
 * Chakra UI customizations.
 *
 * @see https://chakra-ui.com/docs/styled-system/customize-theme
 * @module
 */

import { ComponentSingleStyleConfig } from '@chakra-ui/react';


const NavBar: ComponentSingleStyleConfig = {
  baseStyle: {
    zIndex: 'docked',
    pos: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    bg: 'foreground',
    borderBottom: '1px',
    borderColor: 'inherit',
    borderStyle: 'solid',
    width: 'full',
    padding: 2,
    // height: Constants.Application.HEADER_HEIGHT,
  },
};


const PokemonBadge: ComponentSingleStyleConfig = {
  baseStyle: {
    textTransform: 'uppercase',
    fontFamily: 'mono',
    fontWeight: 'bold',
    textShadow: '1px 1px black',
  },
  variants: {
    bug: {
      backgroundColor: '#729f3f',
    },
    fire: {
      backgroundColor: '#fd7d24',
    },
    flying: {
      backgroundColor: '#8899ff',
    },
    grass: {
      backgroundColor: '#9bcc50',
    },
    normal: {
      backgroundColor: '#a4acaf',
    },
    poison: {
      backgroundColor: '#b97fc9',
    },
    water: {
      backgroundColor: '#4592c4',
    },
    fighting: {
      backgroundColor: '#d56723',
    },
    ground: {
      backgroundColor: '#ddbb55',
    },
    rock: {
      backgroundColor: '#a38c21',
    },
    ghost: {
      backgroundColor: '#7b62a3',
    },
    steel: {
      backgroundColor: '#9eb7b8',
    },
    electric: {
      backgroundColor: '#eed535',
    },
    psychic: {
      backgroundColor: '#f366b9',
    },
    ice: {
      backgroundColor: '#51c4e7',
    },
    dragon: {
      backgroundColor: '#7766ee',
    },
    dark: {
      backgroundColor: '#707070',
    },
    fairy: {
      backgroundColor: '#fdb9e9',
    },
  }
};


const Theme = {
  semanticTokens: {
    colors: {
      foreground: {
        _light: 'gray.50',
        _dark: 'gray.700',
      },
    },
  },
  components: {
    NavBar,
    PokemonBadge
  }
};


export default Theme;
