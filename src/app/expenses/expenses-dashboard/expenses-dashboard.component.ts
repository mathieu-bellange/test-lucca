import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ExpensesStore } from '../../store';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.styl']
})
export class ExpensesDashboardComponent implements OnInit {
  displayedColumns: string[] = ['purchasedOn', 'nature', 'amount', 'currency'];
  dataSource$: Observable<Array<ExpensesStore.ExpenseItem>> = this.store.pipe(
    select(state => state.expenses.expenseItems),
  );

  constructor(private store: Store<{ expenses: { expenseItems: Array<ExpensesStore.ExpenseItem>}}>) { }

  ngOnInit() {
    this.store.dispatch(ExpensesStore.ExpensesActions.loadExpenseItems());
  }
}
