import * as moment from 'moment';

import { Amount } from './amount.entity';

export class ExpenseItem {
  id: string;
  purchasedOn: moment.Moment = moment(new Date(), 'YYYY-MM-DD');
  nature: string;
  comment: string;
  originalAmount: Amount = new Amount();

  constructor(payload?: any) {
    if (!payload) return;
    this.id = payload.id;
    this.purchasedOn = moment(payload.purchasedOn, 'YYYY-MM-DD');
    this.nature = payload.nature;
    this.comment = payload.comment;
    this.originalAmount = new Amount(payload.originalAmount);
  }
}
