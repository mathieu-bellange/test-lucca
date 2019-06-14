import { createAction, props } from '@ngrx/store';

import { ExpenseItem } from './model';

/**
 * action to trigger Expense Items load
 */
export const loadExpenseItems = createAction(
  '[Expenses Page] Load expense items'
);
/**
 * action trigger when Expense Items load successfully
 */
export const loadExpenseItemsSuccessful = createAction(
  '[Expenses API] Expense Items Loaded Success',
  props<{ payload: ExpenseItem[] }>()
);
