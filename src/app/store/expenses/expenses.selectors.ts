import { createSelector } from '@ngrx/store';

import { State } from './expenses.state';
import { AppState } from '../index';
import { ExpenseItem } from './model';

export const selectExpenses = (state: AppState) => state.expenses;

export const selectExpenseItems = createSelector(
  selectExpenses,
  (state: State) => state.entities
);

export const selectExpenseItemById = createSelector(
  selectExpenseItems,
  (entities: { [id: string]: ExpenseItem }, id: string) => entities[id]
);
