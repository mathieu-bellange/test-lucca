import * as ExpensesStore from './expenses';
import { State as ExpensesState} from './expenses/expenses.state';

export interface AppState {
  expenses: ExpensesState;
}

export { ExpensesStore };
