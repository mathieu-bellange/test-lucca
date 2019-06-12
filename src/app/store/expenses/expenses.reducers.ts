import { Action, createReducer, on } from '@ngrx/store';

import * as ExpensesActions from './expenses.actions';

export interface State {
  expenseItems: array;
}

export const initialState: State = {
  expenseItems: []
};

const expensesReducer = createReducer(
  initialState,
  on(ExpensesActions.expenseItemsLoaded, (state, action) => ({ ...state, expenseItems: action.payload }))
);

export function reducer(state: State | undefined, action: Action) {
  return expensesReducer(state, action);
}
