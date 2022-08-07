export const Application = {
  COLOR_MODE_LIGHT                          : 'light',
  FOOTER_HEIGHT                             : '100px',
  HEADER_HEIGHT                             : '60px',
  IGNORED_GAMES                             : [ 'colosseum', 'the-isle-of-armor', 'the-crown-tundra', 'xd' ],
  POKEMON_DB_BASE_URL                       : 'https://pokemondb.net/pokedex/',
  POKEMON_FEATURED_NUM                      : 8,
  POKEMON_INITIAL_LIMIT_NUM                 : 999,
  POKEMON_PER_PAGE                          : 50,                                           // how many pokemon to load at a time when using the infinite scroller
  POKEMON_LABEL                             : 'Pokémon',
  SCREEN_SIZE_DESKTOP                       : 1024,
  SEARCH_TRIGGER_TRESHOLD                   : 2,                                            // how many keys to press before calling filter function
  SPOTLIGHT_IMAGE_HEIGHT                    : 400
};


export const PokemonSpriteURLs = {
  DEFAULT                                   : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{0}.png',
  OFFICIAL_ARTWORK                          : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{0}.png',
};


export const EvolutionConditions: Record<string, any> = {
  'use-item': 'Use',
  min_affection: 'Affection {0} or more',
  min_happiness: 'Friendship {0} or more',
  min_level: 'Level {0}',
  pokemon_v2_item: '{0}',
  pokemonV2ItemByHeldItemId: 'Holding {0}',
  time_of_day: 'During {0}',
  trade: 'Trade',
};
