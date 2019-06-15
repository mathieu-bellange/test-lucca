import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExpensesStore, AppState } from '../../store';
import { slideInOutAnimation } from '../expenses.animations';

/**
 * Expense Items Dashboard Component
 * Dispatch a store action to update ExpenseItems state in the store on init
 * Display all ExpenseItems in an Angular Material Table on store state update
 */
@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.styl'],
  animations: [slideInOutAnimation]
})
export class ExpensesDashboardComponent implements OnInit {
  displayedColumns: string[] = ['purchasedOn', 'nature', 'amount'];
  dataSource$: Observable<Array<ExpensesStore.ExpenseItem>> = this.store.pipe(
    select(ExpensesStore.selectors.selectExpenseItems),
    map(entity => Object.values(entity))
  );

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(ExpensesStore.actions.loadExpenseItems());
  }

  onRowSelected(expenseItem: ExpensesStore.ExpenseItem) {
    this.router.navigate([`./${expenseItem.id}`], { relativeTo: this.route });
  }
}
