import { Currency } from './currency.enum';

export class Amount implements Amount {
  amount: number;
  currency: Currency;

  constructor(payload?: any) {
    if (!payload) return;
    this.amount = payload.amount;
    this.currency = payload.currency;
  }
}
