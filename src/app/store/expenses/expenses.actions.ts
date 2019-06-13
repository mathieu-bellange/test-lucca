import { createAction, props } from '@ngrx/store';

/**
 * action to trigger Expense Items load
 */
export const loadExpenseItems = createAction(
  '[Expenses Page] Load expense items'
);
/**
 * action trigger when Expense Items load successfully
 */
export const expenseItemsLoaded = createAction(
  '[Expenses API] Expense Items Loaded Success',
  props<{ payload: object }>()
);
