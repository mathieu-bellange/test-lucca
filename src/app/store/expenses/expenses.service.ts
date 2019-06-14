import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExpensesService {
  constructor(private http: HttpClient) { }

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
}
