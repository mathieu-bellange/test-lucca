import { createAction } from '@ngrx/store';

export const loadExpenseItems = createAction(
  '[Expenses Page] Load expense items'
);
export const expenseItemsLoaded = createAction(
  '[Expenses API] Expense Items Loaded Success'
);
