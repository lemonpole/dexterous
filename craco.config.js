const path = require( 'path' );


module.exports = {
  webpack: {
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
