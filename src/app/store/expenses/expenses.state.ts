import { ExpenseItem } from './model';

export interface State {
  expenseItems: Array<ExpenseItem>;
}

export const initialState: State = {
  expenseItems: []
};
