import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@dxtr/app';
import { ChakraProvider, ColorModeScript, extendTheme, theme } from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';


/**
 * The index component should contain only
 * HOC that encapsulate the App component.
 *
 * @component Index
 */

function Index() {
  return (
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={extendTheme( Constants.Theme )}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
}


/**
 * React bootstrapping logic.
 *
 * @function anonymous
 */

(() => {
  // grab the root container
  const container = document.getElementById( 'root' );

  if( !container ) {
    throw new Error( 'Failed to find the root element.' );
  }

  // render the react application
  ReactDOM
    .createRoot( container )
    .render( <Index /> )
  ;
})();
