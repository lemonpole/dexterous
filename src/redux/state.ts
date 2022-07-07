import { Types } from '@dxtr/lib';


export interface AppState {
  pokemon: Types.Pokemon[];
  filter: string;
  searching: boolean;
}


export interface AppAction<T> {
  type: string;
  payload?: T
}


export type AppActions = AppAction<AppState[keyof AppState]>;
export type AppDispatch = React.Dispatch<AppActions>;


export const INITIAL_STATE: AppState = {
  pokemon: [],
  filter: '',
  searching: false,
};
