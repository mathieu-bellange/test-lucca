import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { ExpensesStore, AppState } from '../../store';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
/**
 * Expense Item Detail Component
 */
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.styl'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {
  currencies = ExpensesStore.Currency;
  expenseDetailForm = this.fb.group({
    purchasedOn: moment(),
    nature: '',
    amount: '',
    comment: '',
    currency: ExpensesStore.Currency.EUR
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
        purchasedOn: expenseItem.purchasedOn || moment(),
        nature: expenseItem.nature || '',
        amount: expenseItem.originalAmount.amount || '',
        comment: expenseItem.comment || '',
        currency: expenseItem.originalAmount.currency || ExpensesStore.Currency.EUR
      });
    });
  }

  ngOnDestroy() {
    if (this.expenseItemSub) this.expenseItemSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.expenseDetailForm.value);
  }
}
