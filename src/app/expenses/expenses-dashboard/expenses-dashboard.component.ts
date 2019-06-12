import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.styl']
})
export class ExpensesDashboardComponent implements OnInit {
  title = 'dépenses';
  expenseItems$: Observable = this.store.select(state => state.expenseItems);

  constructor(private store: Store) {
    this.expenseItems$.subscribe(expenseItems => console.log(expenseItems));
  }

  ngOnInit() {
    this.store.dispatch({ type: '[Expenses Page] Load expense items' });
  }
}
