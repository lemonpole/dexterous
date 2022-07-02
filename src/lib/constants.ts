export const Application = {
  LANGUAGE_CODE_EN                          : 'en',
  LOCAL_STORAGE_THEME_KEY                   : 'dexterous_theme',
  LOCAL_STORAGE_CACHE_LOADED_KEY            : 'dexterous_cache_loaded',
  IGNORED_MOVE_TYPES                        : [ 'unknown', 'shadow' ],
  IGNORED_GAMES                             : [ 'colosseum', 'xd' ],
  IGNORED_LEARN_METHODS                     : [ 'machine', 'tutor', 'egg' ],
  POKEDEX_CACHE_MAX_AGE                     : 31557600000,                                  // expire cache in 1 year
  POKEMON_DB_BASE_URL                       : 'https://pokemondb.net/pokedex/',
  POKEMON_INITIAL_OFFSET_NUM                : 0,
  POKEMON_INITIAL_LIMIT_NUM                 : 999,
  POKEMON_PER_PAGE                          : 50,                                           // how many pokemon to load at a time when using the infinite scroller
  SCREEN_SIZE_DESKTOP                       : 1024,
  SEARCH_TRIGGER_TRESHOLD                   : 2,                                            // how many keys to press before calling filter function
};


export const ReduxActions = {
  THEME_UPDATE                              : '/theme/update',
  POKEMON_UPDATE                            : '/pokemon/update',
  MOVE_TYPES_UPDATE                         : '/moveTypes/update',
  GAME_VERSIONS_UPDATE                      : '/gameVersions/update',
  CACHE_LOADED_UPDATE                       : '/cacheLoaded/update',
};


export const DamageModifiers: Record<string, [ number, string ]> = {
  'double_damage_to'                        : [ 2, '2x' ],
  'half_damage_to'                          : [ 0.5, '0.5x' ],
  'no_damage_to'                            : [ 0, '0x' ],
  'quad_damage_to'                          : [ 4, '4x' ],
  'quarter_damage_to'                       : [ 0.25, '0.25x' ],
  'normal_damage_to'                        : [ 1, '' ],
};


export const EvolutionConditions: Record<string, string> = {
  'min_happiness'                           : 'Level up with {0} friendship or more',
  'min_level'                               : 'Level {0}',
  'item'                                    : 'Level up using {0}',
  'held_item'                               : 'Level up while holding {0}',
  'trade'                                   : 'Trade',
};


export const LearnMethods: Record<string, [ number, string ]> = {
  'machine'                                 : [ 1, 'Machine' ],                             // useful for sorting learn methods in a list
  'level-up'                                : [ 2, 'Level Up' ],
};
