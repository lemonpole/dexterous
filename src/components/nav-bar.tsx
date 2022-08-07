import { useStyleConfig, ComponentDefaultProps, Box } from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';


/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @component
 * @name NavBar
 */

export default function NavBar( props: ComponentDefaultProps ) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig( 'NavBar', { variant });

  return (
    <Box
      sx={styles}
      h={variant === 'footer'
        ? Constants.Application.FOOTER_HEIGHT
        : Constants.Application.HEADER_HEIGHT
      }
      {...rest}
    >
      {children}
    </Box>
  );
}
