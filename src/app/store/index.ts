import { RouterReducerState } from '@ngrx/router-store';

import * as ExpensesStore from './expenses';
import { State as ExpensesState} from './expenses/expenses.state';

export interface AppState {
  router: RouterReducerState<any>;
  expenses: ExpensesState;
}

export { ExpensesStore };
