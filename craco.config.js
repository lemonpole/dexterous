const path = require( 'path' );


module.exports = {
  webpack: {
    alias: {
      '@dxtr/app': path.resolve( __dirname, 'src/app' ),
      '@dxtr/components': path.resolve( __dirname, 'src/components/' ),
      '@dxtr/containers': path.resolve( __dirname, 'src/containers/' ),
      '@dxtr/lib': path.resolve( __dirname, 'src/lib/' ),
    }
  }
};
