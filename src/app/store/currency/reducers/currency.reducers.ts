import { Action, createReducer } from '@ngrx/store';

import { initialState, State } from './currency.state';

const currencyReducer = createReducer(
  initialState
);

export function reducer(state: State | undefined, action: Action) {
  return currencyReducer(state, action);
}
