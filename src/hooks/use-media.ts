import React from 'react';


export default function useMedia( query: string ) {
  const [ matches, setMatches ] = React.useState( window.matchMedia( query ).matches );

  React.useEffect(() => {
    const media = window.matchMedia( query );

    if( media.matches !== matches ) {
      setMatches( media.matches );
    }

    const listener = () => setMatches( media.matches );
    media.addEventListener( 'change', listener );
    return () => media.removeEventListener( 'change', listener );
  }, [ query, matches ]);

  return matches;
}
