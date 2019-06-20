import { createAction } from '@ngrx/store';

import { reducer } from './currency.reducers';
import { State } from './currency.state';

describe('Currency reducer', () => {
  it('should return the default state on unknown action', () => {
    const initialState: State = { fromCHF: { toEUR: 1 }, fromGBP: { toEUR: 1 }, fromUSD: { toEUR: 1 }};
    const action = createAction('unknown');
    const state = reducer(initialState, action);
    expect(state).toBe(initialState);
  });
});
