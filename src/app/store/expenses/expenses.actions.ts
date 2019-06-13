import { createAction, props } from '@ngrx/store';

export const loadExpenseItems = createAction(
  '[Expenses Page] Load expense items'
);
export const expenseItemsLoaded = createAction(
  '[Expenses API] Expense Items Loaded Success',
  props<{ payload: object }>()
);
