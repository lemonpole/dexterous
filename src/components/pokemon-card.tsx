import { useStyleConfig, ComponentDefaultProps, Stack } from '@chakra-ui/react';


/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @component
 * @name PokemonCard
 */

export default function PokemonCard( props: ComponentDefaultProps ) {
  const { children, ...rest } = props;
  const styles = useStyleConfig( 'PokemonCard' );

  return (
    <Stack
      sx={styles}
      {...rest}
    >
      {children}
    </Stack>
  );
}
