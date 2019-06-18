import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { ExpensesStore, AppState } from '../../store';
import { ExpenseDialogComponent } from '../expense-dialog';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
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
  maxDate = moment();
  currencies = ExpensesStore.Currency;
  expenseDetailForm = this.fb.group({
    purchasedOn: moment(),
    nature: '',
    originalAmount: this.fb.group({
      amount: '',
      currency: ExpensesStore.Currency.EUR
    }),
    comment: ''
  });
  expenseItem$: Observable<ExpensesStore.ExpenseItem> = this.store.pipe(
    select(ExpensesStore.selectors.selectExpenseItemById),
    filter(entity => !!entity)
  );
  expenseItemSub: Subscription;
  responseDialog: (result: boolean) => void = (result: boolean) => console.log(result);

  constructor(
    private store: Store<AppState>, private fb: FormBuilder, public dialog: MatDialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.expenseItemSub = this.expenseItem$.subscribe(expenseItem => {
      this.expenseDetailForm.setValue({
        purchasedOn: expenseItem.purchasedOn || moment(),
        nature: expenseItem.nature || '',
        originalAmount: {
          amount: expenseItem.originalAmount.amount || '',
          currency: expenseItem.originalAmount.currency || ExpensesStore.Currency.EUR
        },
        comment: expenseItem.comment || ''
      });
    });
  }

  ngOnDestroy() {
    if (this.expenseItemSub) this.expenseItemSub.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(ExpensesStore.actions.updateExpenseItem({ payload: this.expenseDetailForm.value }));
    this.onBack();
  }

  onBack() {
    this.expenseDetailForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteConfirmDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      data: this.expenseDetailForm.value
    });

    dialogRef.afterClosed().subscribe(this.responseDialog);
  }
}
