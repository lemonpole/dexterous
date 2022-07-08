export const Application = {
  API_BASE_URL                              : 'https://beta.pokeapi.co/graphql/v1beta',
  COLOR_MODE_LIGHT                          : 'light',
  HEADER_HEIGHT                             : '60px',
  POKEMON_INITIAL_LIMIT_NUM                 : 10,
  POKEMON_PER_PAGE                          : 50,                                           // how many pokemon to load at a time when using the infinite scroller
  POKEMON_LABEL                             : 'Pokémon',
  SCREEN_SIZE_DESKTOP                       : 1024,
  SEARCH_TRIGGER_TRESHOLD                   : 2,                                            // how many keys to press before calling filter function
};


export const PokemonSpriteURLs = {
  DEFAULT                                   : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{0}.png',
  OFFICIAL_ARTWORK                          : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{0}.png',
};
