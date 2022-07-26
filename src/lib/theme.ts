/**
 * Chakra UI customizations.
 *
 * @see https://chakra-ui.com/docs/styled-system/customize-theme
 * @module
 */

import { ComponentMultiStyleConfig, ComponentSingleStyleConfig, ComponentStyleConfig } from '@chakra-ui/react';


// pokemon type colors and variant styles
const pokemonTypeBase = {
  color: 'white',
  fontFamily: 'mono',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadow: '1px 1px black',
  textTransform: 'uppercase',
};


const pokemonTypeVariants = {
  bug: {
    backgroundColor: '#729f3f',
    ...pokemonTypeBase,
  },
  fire: {
    backgroundColor: '#fd7d24',
    ...pokemonTypeBase,
  },
  flying: {
    backgroundColor: '#8899ff',
    ...pokemonTypeBase,
  },
  grass: {
    backgroundColor: '#9bcc50',
    ...pokemonTypeBase,
  },
  normal: {
    backgroundColor: '#a4acaf',
    ...pokemonTypeBase,
  },
  poison: {
    backgroundColor: '#b97fc9',
    ...pokemonTypeBase,
  },
  water: {
    backgroundColor: '#4592c4',
    ...pokemonTypeBase,
  },
  fighting: {
    backgroundColor: '#d56723',
    ...pokemonTypeBase,
  },
  ground: {
    backgroundColor: '#ddbb55',
    ...pokemonTypeBase,
  },
  rock: {
    backgroundColor: '#a38c21',
    ...pokemonTypeBase,
  },
  ghost: {
    backgroundColor: '#7b62a3',
    ...pokemonTypeBase,
  },
  steel: {
    backgroundColor: '#9eb7b8',
    ...pokemonTypeBase,
  },
  electric: {
    backgroundColor: '#eed535',
    ...pokemonTypeBase,
  },
  psychic: {
    backgroundColor: '#f366b9',
    ...pokemonTypeBase,
  },
  ice: {
    backgroundColor: '#51c4e7',
    ...pokemonTypeBase,
  },
  dragon: {
    backgroundColor: '#7766ee',
    ...pokemonTypeBase,
  },
  dark: {
    backgroundColor: '#707070',
    ...pokemonTypeBase,
  },
  fairy: {
    backgroundColor: '#fdb9e9',
    ...pokemonTypeBase,
  },
};


// damage modifier variants
const damageModifierVariants = {
  0.25: {
    color: '#7c0000',
  },
  0.5: {
    color: '#a40000',
  },
  2: {
    color: '#4e9a06',
  },
  4: {
    color: '#73d216',
  },
};


// custom chakra components
const NavBar: ComponentSingleStyleConfig = {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    bg: 'foreground',
    borderStyle: 'solid',
    width: 'full',
    padding: 2,
  },
  variants: {
    header: {
      zIndex: 'docked',
      pos: 'fixed',
      top: 0,
      left: 0,
      borderBottom: '1px',
      borderBottomColor: 'chakra-border-color',
    },
    footer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      borderTop: '1px',
      borderTopColor: 'chakra-border-color',
    }
  }
};


const PokemonBadge: ComponentSingleStyleConfig = {
  variants: pokemonTypeVariants,
};


const PokemonCard: ComponentSingleStyleConfig = {
  baseStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    bg: 'foreground',
    boxShadow: 'md',
    height: '220px',
    border: '1px',
    borderColor: 'chakra-border-color',
  }
};


const PokemonList: ComponentMultiStyleConfig = {
  parts: [ 'list', 'item' ],
  baseStyle: {
    item: {
      display: 'flex',
      alignItems: 'center',
      height: 24,
      paddingX: 4,
      paddingY: 2,
      cursor: 'pointer',
      borderRadius: 'base',
    },
  },
};


const ProgressiveImage: ComponentSingleStyleConfig = {
  baseStyle: {
    transition: 'filter 0.3s ease-out'
  }
};


// chakra component overrides
const Heading: ComponentStyleConfig = {
  baseStyle: {
    textTransform: 'uppercase',
    fontVariant: [ 'small-caps' ]
  },
};


const Text: ComponentStyleConfig = {
  variants: {
    ...pokemonTypeVariants,
    ...damageModifierVariants,
    muted: {
      opacity: '0.5',
    },
    pokemon: {
      textTransform: 'uppercase',
      fontVariant: [ 'small-caps' ],
      fontWeight: 'hairline',
    }
  }
};


// chakra theme object
const Theme = {
  semanticTokens: {
    colors: {
      foreground: {
        _light: 'gray.50',
        _dark: 'gray.700',
      },
    },
  },
  colors: {
    // generated from: https://smart-swatch.netlify.app/#937DC2
    brand: {
      50: '#f3edff',
      100: '#d5caea',
      200: '#b7a8d7',
      300: '#9a86c6',
      400: '#7d63b5',
      500: '#64499b',
      600: '#4e3979',
      700: '#372958',
      800: '#211736',
      900: '#0d0617',
    }
  },
  styles: {
    global: {
      a: {
        color: 'brand.300',
      }
    }
  },
  components: {
    Heading,
    NavBar,
    PokemonBadge,
    PokemonCard,
    PokemonList,
    ProgressiveImage,
    Text,
  }
};


export default Theme;
