import PokemonBadge from './pokemon-badge';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  useMultiStyleConfig, createStylesContext,
  ComponentDefaultProps,
  List, ListItem, ListIcon,
  Stack, HStack, Text
} from '@chakra-ui/react';


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
      {...rest}
    >
      <StylesProvider value={styles}>
        {children}
      </StylesProvider>
    </List>
  );
}


interface PokemonListItemProps extends ComponentDefaultProps {
  data: any;
}


/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @component
 * @name PokemonListItem
 */

export function PokemonListItem( props: PokemonListItemProps ) {
  const styles = useStyles();
  const { data, ...rest } = props;

  return (
    <ListItem sx={styles.item} {...rest}>
      <ListIcon
        as={ChevronRightIcon}
        boxSize="2em"
      />
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
          {data.types.map( ( type: string ) => (
            <PokemonBadge
              key={type}
              size="sm"
              variant={type.toLocaleLowerCase()}
            >
              {type}
            </PokemonBadge>
          ))}
        </HStack>
      </Stack>
    </ListItem>
  );
}
