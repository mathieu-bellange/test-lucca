import { RouterReducerState } from '@ngrx/router-store';

import * as fromExpenses from './expenses';
import * as fromCurrency from './currency';

export interface AppState {
  router: RouterReducerState<any>;
  expenses: fromExpenses.State;
  currency: fromCurrency.State;
}

export { fromExpenses, fromCurrency };
export * from './model';
