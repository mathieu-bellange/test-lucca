import * as ExpensesStore from './expenses';
import { reducers, metaReducers } from './reducers';

export interface AppState {
  expenses: ExpensesStore.State;
}

export { ExpensesStore, reducers, metaReducers };
