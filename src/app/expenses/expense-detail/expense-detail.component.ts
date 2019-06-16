import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ExpensesStore, AppState } from '../../store';

/**
 * Expense Item Detail Component
 */
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.styl']
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {
  expenseDetailForm = this.fb.group({
    date: [''],
    nature: [''],
    amount: [''],
    comment: ['']
  });
  expenseItem$: Observable<ExpensesStore.ExpenseItem> = this.store.pipe(
    select(ExpensesStore.selectors.selectExpenseItemById),
    filter(entity => !!entity)
  );
  expenseItemSub: Subscription;

  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.expenseItemSub = this.expenseItem$.subscribe(expenseItem => {
      this.expenseDetailForm.setValue({
        date: [expenseItem.purchasedOn],
        nature: [expenseItem.nature],
        amount: [expenseItem.originalAmount.amount],
        comment: [expenseItem.comment]
      });
    });
  }

  ngOnDestroy() {
    this.expenseItemSub.unsubscribe();
  }
}
