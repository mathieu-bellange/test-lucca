import { RouterReducerState } from '@ngrx/router-store';

import * as fromExpenses from './expenses';
import { State as ExpensesState} from './expenses';

export interface AppState {
  router: RouterReducerState<any>;
  expenses: ExpensesState;
}

export { fromExpenses };
export * from './model';
