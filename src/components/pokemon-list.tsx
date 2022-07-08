import PokemonBadge from './pokemon-badge';
import ProgressiveImage from './progressive-image';
import {
  useMultiStyleConfig, createStylesContext,
  ComponentDefaultProps,
  List, ListItem, ListIcon,
  Stack, HStack, Text
} from '@chakra-ui/react';
import { Constants, Types, util } from '@dxtr/lib';


// this is needed to provide styles
// context to child components
const [ StylesProvider, useStyles ] = createStylesContext( 'PokemonList' );


/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @component
 * @name PokemonList
 */

export function PokemonList( props: ComponentDefaultProps ) {
  const { children, ...rest } = props;
  const styles = useMultiStyleConfig( 'PokemonList' );

  return (
    <List
      sx={styles.list}
      spacing={3}
      {...rest}
    >
      <StylesProvider value={styles}>
        {children}
      </StylesProvider>
    </List>
  );
}


interface PokemonListItemProps extends ComponentDefaultProps {
  data: Types.Pokemon;
  onClick: ( name: string ) => void;
}


/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @component
 * @name PokemonListItem
 */

export function PokemonListItem( props: PokemonListItemProps ) {
  const { data, onClick, ...rest } = props;
  const styles = useStyles();
  const spriteUrl = util.formatString( Constants.PokemonSpriteURLs.DEFAULT, [ data.pokemon_species_id.toString() ]);

  // @todo: turn into a chakra component
  const SpriteIcon = () => (
    <ProgressiveImage
      lowQualitySrc={spriteUrl}
      boxSize="16"
      objectFit="contain"
    />
  );

  return (
    <ListItem
      sx={styles.item}
      onClick={() => onClick( data.name )}
      {...rest}
    >
      <HStack>
        <ListIcon as={SpriteIcon} />
        <Stack spacing="1">
          <Text
            fontSize="xs"
            opacity="0.5"
            fontFamily="mono"
          >
            #{data.id}
          </Text>
          <Text
            textStyle="h2"
            textTransform="uppercase"
            fontWeight="thin"
          >
            {data.name}
          </Text>
          <HStack>
            {data.pokemon_v2_pokemontypes.map( ( type: any ) => (
              <PokemonBadge
                key={type.pokemon_v2_type.name}
                size="sm"
                variant={type.pokemon_v2_type.name.toLowerCase()}
              >
                {type.pokemon_v2_type.name}
              </PokemonBadge>
            ))}
          </HStack>
        </Stack>
      </HStack>
    </ListItem>
  );
}
