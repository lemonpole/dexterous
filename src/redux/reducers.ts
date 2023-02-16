import { ReduxActions } from './actions';
import { AppAction, AppActions, AppState, INITIAL_STATE } from './state';

function featured(
  state: typeof INITIAL_STATE.featured,
  action: AppAction<typeof INITIAL_STATE.featured>
) {
  switch (action.type) {
    case ReduxActions.FEATURED_UPDATE:
      return action.payload as typeof state;
    default:
      return state;
  }
}

function filter(
  state: typeof INITIAL_STATE.filter,
  action: AppAction<typeof INITIAL_STATE.filter>
) {
  switch (action.type) {
    case ReduxActions.FILTER_UPDATE:
      return action.payload as typeof state;
    default:
      return state;
  }
}

function pokemon(
  state: typeof INITIAL_STATE.pokemon,
  action: AppAction<typeof INITIAL_STATE.pokemon>
) {
  switch (action.type) {
    case ReduxActions.POKEMON_UPDATE:
      return action.payload as typeof state;
    default:
      return state;
  }
}

function pokemonTypes(
  state: typeof INITIAL_STATE.pokemonTypes,
  action: AppAction<typeof INITIAL_STATE.pokemonTypes>
) {
  switch (action.type) {
    case ReduxActions.POKEMON_TYPES_UPDATE:
      return action.payload as typeof state;
    default:
      return state;
  }
}

function pokemonGenerations(
  state: typeof INITIAL_STATE.pokemonGenerations,
  action: AppAction<typeof INITIAL_STATE.pokemonGenerations>
) {
  switch (action.type) {
    case ReduxActions.POKEMON_GENERATIONS_UPDATE:
      return action.payload as typeof state;
    default:
      return state;
  }
}

function searching(
  state: typeof INITIAL_STATE.searching,
  action: AppAction<typeof INITIAL_STATE.searching>
) {
  switch (action.type) {
    case ReduxActions.SEARCHING_UPDATE:
      return action.payload as typeof state;
    default:
      return state;
  }
}

export default function reducers(state: AppState, action: AppActions) {
  return {
    featured: featured(
      state.featured,
      action as AppAction<typeof state.featured>
    ),
    filter: filter(state.filter, action as AppAction<typeof state.filter>),
    pokemonGenerations: pokemonGenerations(
      state.pokemonGenerations,
      action as AppAction<typeof state.pokemonGenerations>
    ),
    pokemon: pokemon(state.pokemon, action as AppAction<typeof state.pokemon>),
    pokemonTypes: pokemonTypes(
      state.pokemonTypes,
      action as AppAction<typeof state.pokemonTypes>
    ),
    searching: searching(
      state.searching,
      action as AppAction<typeof state.searching>
    ),
  };
}
