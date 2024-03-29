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
  props<{ payload: { items: any[], count: number } }>()
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
/**
 * action to trigger Expense Item update
 */
export const updateExpenseItem = createAction(
  '[Expenses Page] Update expense item by id',
  props<{ payload: any }>()
);
/**
 * action trigger when Expense Item updated successfully
 */
export const updateExpenseItemSuccessful = createAction(
  '[Expenses API] Expense Item by id updated Success',
  props<{ payload: any }>()
);
/**
 * action trigger when Expense Item created successfully
 */
export const createExpenseItemSuccessful = createAction(
  '[Expenses API] Expense Item by id created Success',
  props<{ payload: any }>()
);
/**
 * action to trigger Expense Item delete with id
 */
export const deleteExpenseItem = createAction(
  '[Expenses Page] Delete expense item by id',
  props<{ id: string }>()
);
/**
 * action trigger when Expense Item delete successfully
 */
export const deleteExpenseItemSuccessful = createAction(
  '[Expenses API] Expense Item by id Deleted Success',
  props<{ id: string }>()
);
