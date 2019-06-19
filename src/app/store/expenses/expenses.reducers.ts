import { Action, createReducer, on } from '@ngrx/store';
import { remove, unset } from 'lodash';

import * as ExpensesActions from './expenses.actions';
import { initialState, State } from './expenses.state';
import { ExpenseItem } from './model';

const expensesReducer = createReducer(
  initialState,
  on(ExpensesActions.loadExpenseItemsSuccessful, (state, action) => {
    const newState: State = {
      ids: [],
      entities: {}
    };
    action.payload.forEach(val => {
      const expenseItem: ExpenseItem = new ExpenseItem(val);
      newState.ids.push(expenseItem.id);
      newState.entities[expenseItem.id] = expenseItem;
    });
    return newState;
  }),
  on(ExpensesActions.loadExpenseItemByIdSuccessful, ExpensesActions.updateExpenseItemSuccessful, (state, action) => {
    return {
      ids: [...state.ids],
      entities: {...state.entities, [action.payload.id]: new ExpenseItem(action.payload) }
    };
  }),
  on(ExpensesActions.deleteExpenseItemSuccessful, (state, action) => {
    unset(state.entities, action.id);
    return {
      ids: remove([...state.ids], action.id),
      entities: {...state.entities }
    };
  }),
  on(ExpensesActions.createExpenseItemSuccessful, (state, action) => {
    return {
      ids: [...state.ids, action.payload.id],
      entities: {...state.entities, [action.payload.id]: new ExpenseItem(action.payload) }
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return expensesReducer(state, action);
}
