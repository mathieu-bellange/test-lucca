import { Action, createReducer, on } from '@ngrx/store';

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
      const expenseItem: ExpenseItem = Object.assign({}, val);
      newState.ids.push(expenseItem.id);
      newState.entities[expenseItem.id] = expenseItem;
    });
    return newState;
  }),
  on(ExpensesActions.loadExpenseItemByIdSuccessful, (state, action) => {
    return {
      ids: [...state.ids],
      entities: {...state.entities, [action.payload.id]: action.payload }
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return expensesReducer(state, action);
}
