import * as moment from 'moment';

import { Amount } from './amount.entity';

const DATE_FORMAT = 'YYYY-MM-DD';
// FIXME find a better way to fix moment date when stringify by httpClient request
moment.fn.toJSON = function() { return this.format(DATE_FORMAT); };

export class ExpenseItem {
  id: string;
  purchasedOn: moment.Moment = moment(new Date(), DATE_FORMAT);
  nature: string;
  comment: string;
  originalAmount: Amount = new Amount();

  constructor(payload?: any) {
    if (!payload) return;
    this.id = payload.id;
    this.purchasedOn = moment(payload.purchasedOn, DATE_FORMAT);
    this.nature = payload.nature;
    this.comment = payload.comment;
    this.originalAmount = new Amount(payload.originalAmount);
  }
}
