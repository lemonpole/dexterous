import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@dxtr/app';
import { HashRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider, ColorModeScript, extendTheme, theme } from '@chakra-ui/react';
import { AppStateProvider } from '@dxtr/redux';
import { Constants, Theme } from '@dxtr/lib';


/**
 * Apollo client.
 *
 * @constant
 */

const client = new ApolloClient({
  uri: Constants.Application.API_BASE_URL,
  cache: new InMemoryCache(),
});


/**
 * The index component should contain only
 * HOCs that encapsulate the App component.
 *
 * @component
 * @name Index
 */

function Index() {
  return (
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={extendTheme( Theme )}>
        <ApolloProvider client={client}>
          <AppStateProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </AppStateProvider>
        </ApolloProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}


/**
 * React bootstrapping logic.
 *
 * @function
 * @name anonymous
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
