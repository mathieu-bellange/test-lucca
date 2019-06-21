import { createAction } from '@ngrx/store';

import { reducer } from './currency.reducers';
import { State } from './currency.state';

describe('Currency reducer', () => {
  it('should return the default state on unknown action', () => {
    const initialState: State = { toEUR: { fromCHF: 1, fromGBP: 1, fromUSD: 1, fromEUR: 1 }};
    const action = createAction('unknown');
    const state = reducer(initialState, action);
    expect(state).toBe(initialState);
  });
});
