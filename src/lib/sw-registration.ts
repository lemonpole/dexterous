/**
 * This is used to register a service worker.
 *
 * This lets the app load faster on subsequent visits in production, and gives
 * it offline capabilities. However, it also means that developers (and users)
 * will only see deployed updates on subsequent visits to a page, after all the
 * existing tabs open on the page have been closed, since previously cached
 * resources are updated in the background.
 *
 * To learn more about the benefits of this model and instructions on how to
 * opt-in, read https://cra.link/PWA
 */


/**
 * Check if running on localhost.
 *
 * @constant
 */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost'

  // [::1] is the IPv6 localhost address.
  || window.location.hostname === '[::1]'

  // 127.0.0.0/8 are considered localhost for IPv4.
  || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);


/**
 * Check if service workers are enabled.
 *
 * @constant
 */

const swEnabled = Boolean(
  // always enable in production
  process.env.NODE_ENV === 'production'

  // only enable in dev if it's explicitly enabled
  || process.env.REACT_APP_SW_ENABLED === 'true'
);


/**
 * The service worker URL.
 *
 * @constant
 */

const swUrl = `${process.env.PUBLIC_URL}/sw.js`;


/**
 * Handle service worker state change event.
 *
 * @function
 */

function handleStateChange( this: ServiceWorker ) {
  if( this.state === 'installed' ) {
    if( navigator.serviceWorker.controller ) {
      // At this point, the updated precached content has been fetched,
      // but the previous service worker will still serve the older
      // content until all client tabs are closed.
      console.log(
        'New content is available and will be used when all ' +
        'tabs for this page are closed. See https://cra.link/PWA.'
      );
    } else {
      // At this point, everything has been precached.
      //
      // It's the perfect time to display a message.
      console.log( 'Content is cached for offline use.' );
    }
  }
}


/**
 * Handle service worker update event.
 *
 * @function
 */

function handleUpdate( this: ServiceWorkerRegistration ) {
  const installingWorker = this.installing;

  if( installingWorker === null ) {
    return;
  }

  installingWorker.onstatechange = handleStateChange;
}


/**
 * Handler for the page loaded event.
 *
 * @function
 */

function handlePageLoaded() {
  // register the service worker
  navigator.serviceWorker
    .register( swUrl )
    .then( registration => registration.onupdatefound = handleUpdate )
    .catch( error => console.error( 'Error during service worker registration:', error ) )
  ;

  // Add some additional logging to localhost, pointing
  // developers to the service worker/PWA documentation.
  if( isLocalhost ) {
    navigator.serviceWorker.ready.then( () => {
      console.log(
        'This web app is being served cache-first by a service ' +
        'worker. To learn more, visit https://cra.link/PWA'
      );
    });
  }
}


/**
 * Registers the service worker.
 *
 * @function
 */

export function register() {
  // bail early if the service worker is disabled or is on
  // a different origin from the rest of our app
  const publicUrl = new URL( process.env.PUBLIC_URL, window.location.href );

  if(
    !swEnabled
    || !navigator.serviceWorker
    || publicUrl.origin !== window.location.origin
  ) {
    return;
  }

  // do not register the service worker
  // until the page has fully loaded
  window.addEventListener( 'load', handlePageLoaded );
}


/**
 * Unregisters the service worker.
 *
 * @function
 */

export function unregister() {
  if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.ready
      .then( registration => registration.unregister() )
      .catch( error => console.error( error.message ) )
    ;
  }
}
