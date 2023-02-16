import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@dxtr/app';
import PackageInfo from '@dxtr/package';
import { HashRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { AppStateProvider } from '@dxtr/redux';
import { Theme, ServiceWorkerRegistration } from '@dxtr/lib';
import {
  extendTheme,
  theme,
  ChakraProvider,
  ColorModeScript,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

/**
 * The index component waits for the apollo client cache
 * to be loaded before rendering the rest of the app.
 *
 * @component
 * @name Index
 */

function Index() {
  type IApolloClient = ApolloClient<NormalizedCacheObject>;
  const [client, setClient] = React.useState<IApolloClient>();

  // restore the cache (if any)
  React.useEffect(() => {
    const cache = new InMemoryCache();
    const storage = new LocalStorageWrapper(window.localStorage);

    persistCache({ cache, storage })
      .then(() =>
        setClient(
          new ApolloClient({
            uri: PackageInfo.codegen.schema,
            cache,
          })
        )
      )
      .catch(console.error);
  }, []);

  // wait for cache to be restored
  if (!client) {
    return (
      <React.StrictMode>
        <ChakraProvider theme={extendTheme(Theme)}>
          <VStack w="100vw" h="100vh" align="center" justify="center">
            <Spinner size="xl" color="brand.300" />
            <Text>Loading cache...</Text>
          </VStack>
        </ChakraProvider>
      </React.StrictMode>
    );
  }

  // now we can render the app
  return (
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={extendTheme(Theme)}>
        <ApolloProvider client={client as IApolloClient}>
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
  const container = document.getElementById('root');

  if (!container) {
    throw new Error('Failed to find the root element.');
  }

  // render the react application
  ReactDOM.createRoot(container).render(<Index />);

  // register service worker
  ServiceWorkerRegistration.register();
})();
