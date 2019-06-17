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
export const loadExpenseItemsSuccessful = createAction(
  '[Expenses API] Expense Items Loaded Success',
  props<{ payload: any[] }>()
);
/**
 * action to trigger Expense Item load by id
 */
export const loadExpenseItemById = createAction(
  '[Expenses Page] Load expense item by id',
  props<{ id: string }>()
);
/**
 * action trigger when Expense Item load by id successfully
 */
export const loadExpenseItemByIdSuccessful = createAction(
  '[Expenses API] Expense Item by id Loaded Success',
  props<{ payload: any }>()
);
