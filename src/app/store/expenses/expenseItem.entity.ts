import { Amount } from './amount.entity';

export interface ExpenseItem {
  id: string;
  purchasedOn: Date;
  nature: string;
  comment: string;
  originalAmount: Amount;
}
