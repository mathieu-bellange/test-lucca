import { createSelector } from '@ngrx/store';

import { State } from './expenses.state';
import { AppState } from '../index';
import { selectRouteParams } from '../router.selectors';
import { ExpenseItem } from './model';

export const selectExpenses = (state: AppState) => state.expenses;

export const selectExpenseItems = createSelector(
  selectExpenses,
  (state: State) => state.entities
);

export const selectExpenseItemById = createSelector(
  selectExpenseItems,
  selectRouteParams,
  (entities, params) => params ? entities[params.id] : new ExpenseItem()
);
