export const ReduxActions = {
  FILTER_UPDATE     : '/filter/update',
  POKEMON_UPDATE    : '/pokemon/update',
  SEARCHING_UPDATE  : '/searching/update',
};


export function searchingUpdate( payload: boolean ) {
  return {
    type: ReduxActions.SEARCHING_UPDATE,
    payload
  };
}


export function filterUpdate( payload: string ) {
  return {
    type: ReduxActions.FILTER_UPDATE,
    payload
  };
}
