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
}
