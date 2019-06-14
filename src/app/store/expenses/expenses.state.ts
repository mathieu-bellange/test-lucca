import { ExpenseItem } from './model';

export interface State {
  ids: string[];
  entities: { [id: string]: ExpenseItem};
}

export const initialState: State = {
  ids: [],
  entities: {}
};
