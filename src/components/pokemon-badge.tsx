import { ComponentDefaultProps, Tag, useStyleConfig } from '@chakra-ui/react';


/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @component
 * @name PokemonBadge
 */

export default function PokemonBadge( props: ComponentDefaultProps ) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig( 'PokemonBadge', { variant });
  return (
    <Tag
      variant="solid"
      sx={styles}
      {...rest}
    >
      {children}
    </Tag>
  );
}
