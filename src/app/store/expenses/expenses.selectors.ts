import { createSelector } from '@ngrx/store';

import { State } from './expenses.state';
import { AppState } from '../index';

export const selectExpenses = (state: AppState) => state.expenses;

export const selectExpenseItems = createSelector(
  selectExpenses,
  (state: State) => state.expenseItems
);
