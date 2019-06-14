import { Amount } from './amount.entity';

export interface ExpenseItem {
  id: string;
  purchasedOn: string;
  nature: string;
  comment: string;
  originalAmount: Amount;
}
