import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ExpensesStore, AppState } from '../../store';

/**
 * Expense Item Detail Component
 */
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.styl']
})
export class ExpenseDetailComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}
}
