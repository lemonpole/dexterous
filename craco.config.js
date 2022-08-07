const packageInfo = require( './package.json' );
const path = require( 'path' );
const workbox = require( 'workbox-webpack-plugin' );


const MAX_CACHE_NUM = 20;
const SPRITE_CACHE_SUFFIX = 'pokemon-sprites-cache';
const SPRITE_REGEX = /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/[/\-\w\d]+\/[\d\w-]+\.(?:png|svg|gif)/;


module.exports = {
  webpack: {
    // register our service worker that will
    // store the pokemon sprites in cache
    plugins: [
      new workbox.GenerateSW({
        // we only want to cache pokemon
        // sprites image requests
        exclude: [
          /\.js$/,
          /\.map$/,
          /\.html$/,
        ],

        // in dev, this becomes a virtual file
        // that is served by the dev server
        swDest: 'sw.js',

        // register route that will cache the images
        runtimeCaching: [{
          urlPattern: new RegExp( SPRITE_REGEX ),
          handler: 'CacheFirst',
          options: {
            // limit cache to a set number of images
            cacheName: `${packageInfo.name}-${SPRITE_CACHE_SUFFIX}`,
            expiration: {
              maxEntries: MAX_CACHE_NUM,
            },

            // due to cors, images will come in as
            // opaque which we need to store
            cacheableResponse: {
              statuses: [ 0, 200 ],
            }
          }
        }],

        // other configuration
        clientsClaim: true,
      })
    ],

    // register convenient path aliases
    alias: {
      '@dxtr/app': path.resolve( __dirname, 'src/app' ),
      '@dxtr/components': path.resolve( __dirname, 'src/components/' ),
      '@dxtr/containers': path.resolve( __dirname, 'src/containers/' ),
      '@dxtr/hooks': path.resolve( __dirname, 'src/hooks/' ),
      '@dxtr/lib': path.resolve( __dirname, 'src/lib/' ),
      '@dxtr/package': path.resolve( __dirname, 'package.json' ),
      '@dxtr/pages': path.resolve( __dirname, 'src/pages/' ),
      '@dxtr/redux': path.resolve( __dirname, 'src/redux/' ),
    }
  }
};
