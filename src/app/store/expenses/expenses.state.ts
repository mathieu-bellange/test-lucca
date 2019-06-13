import { ExpenseItem } from './expenseItem.entity';

export interface State {
  expenseItems: Array<ExpenseItem>;
}

export const initialState: State = {
  expenseItems: []
};
