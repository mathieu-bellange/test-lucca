import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, mergeMap, tap, map } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { fromExpenses, AppState, Currency, ExpenseItem } from '../../store';
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
  currencies = Currency;
  expenseDetailForm = this.fb.group({
    purchasedOn: [moment(), [Validators.required]],
    nature: ['', [Validators.required]],
    originalAmount: this.fb.group({
      amount: ['', [Validators.required]],
      currency: [Currency.EUR]
    }),
    comment: ''
  });
  expenseItem$: Observable<ExpenseItem> = this.store.pipe(
    select(fromExpenses.selectExpenseItemById),
    filter(entity => !!entity)
  );
  newItem$: Observable<boolean> = this.expenseItem$.pipe(map(entity => !!entity.id));
  expenseItemSub: Subscription;
  dialogRefSub: Subscription;

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
          currency: expenseItem.originalAmount.currency || Currency.EUR
        },
        comment: expenseItem.comment || ''
      });
    });
  }

  ngOnDestroy() {
    if (this.expenseItemSub) this.expenseItemSub.unsubscribe();
    if (this.dialogRefSub) this.dialogRefSub.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.expenseDetailForm.controls; }

  onSubmit() {
    this.store.dispatch(fromExpenses.updateExpenseItem({ payload: this.expenseDetailForm.value }));
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

    this.dialogRefSub = dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(() => this.expenseItem$),
        tap(expenseItem => this.store.dispatch(fromExpenses.deleteExpenseItem({ id: expenseItem.id})))
      ).subscribe(() => this.onBack());
  }
}
