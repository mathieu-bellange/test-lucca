import * as ExpensesStore from './expenses';

export interface AppState {
  expenses: ExpensesStore.State;
}

export { ExpensesStore };
