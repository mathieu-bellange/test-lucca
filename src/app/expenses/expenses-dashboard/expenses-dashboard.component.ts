import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ExpensesStore, AppState } from '../../store';

/**
 * Expense Items Dashboard Component
 * Dispatch a store action to update ExpenseItems state in the store on init
 * Display all ExpenseItems in an Angular Material Table on store state update
 */
@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.styl']
})
export class ExpensesDashboardComponent implements OnInit {
  displayedColumns: string[] = ['purchasedOn', 'nature', 'amount'];
  dataSource$: Observable<Array<ExpensesStore.ExpenseItem>> = this.store.pipe(
    select(ExpensesStore.selectors.selectExpenseItems)
  );

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(ExpensesStore.actions.loadExpenseItems());
  }
}
