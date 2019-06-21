import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../index';
import { ExpenseItem, Currency } from '../../model';
import * as fromCurrency from '../../currency';

@Injectable()
export class ExpensesService {
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  /**
   * Request all ExpenseItems
   * @return Observable<[ExpenseItem]>
   */
  getAll() {
    return this.http.get('/api/expenseItems');
  }

  /**
   * Request an expenseItem by id
   * @param  id id of the expenseItem
   * @return    ExpenseItem
   */
  get(id: string) {
    return this.http.get(`/api/expenseItems/${id}`);
  }

  /**
   * Delete an expenseItem by id
   * @param  id id of the expenseItem
   * @return    Status 200
   */
  delete(id: string) {
    return this.http.delete(`/api/expenseItems/${id}`).pipe(
      map(() => ({ id }))
    );
  }

  /**
   * Update an expenseItem
   * @param  body the expense item
   * @param  id   id of the expense item to update
   * @return      ExpenseItem updated
   */
  put(body: any, id: string) {
    return this.http.put(`/api/expenseItems/${id}`, body);
  }

  /**
   * create an expenseItem
   * @param  body the expense item
   * @return      ExpenseItem updated
   */
  post(body: any) {
    return this.http.post('/api/expenseItems', body);
  }

  /**
   * calcul convertedAmount of an expenseItem
   * Use EUR for converted amount by default
   * @param  expenseItem the expense item to update
   * @return             Expense item with converted amount updated
   */
  convertedAmount(expenseItem: ExpenseItem) {
    return this.store.pipe(
      select(fromCurrency.selectRateToEuro, { currency: expenseItem.originalAmount.currency }),
      map(rate => Object.assign({}, expenseItem, {
        convertedAmount: {
          amount: rate * expenseItem.originalAmount.amount,
          currency: Currency.EUR
        }
      }))
    );
  }
}
