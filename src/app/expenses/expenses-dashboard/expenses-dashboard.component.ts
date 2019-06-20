import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import {MediaObserver} from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { fromExpenses, AppState, ExpenseItem } from '../../store';
import { slideInOutAnimation } from '../expenses.animations';
import { ExpenseDialogComponent } from '../expense-dialog';

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
  displayedColumns: string[];
  displayedColumnsOnXs: string[] = ['purchasedOn', 'nature', 'amount'];
  displayedColumnsOnOthers: string[] = ['addExpenseItem', 'purchasedOn', 'nature', 'amount', 'delete'];
  dataSource$: Observable<Array<ExpenseItem>> = this.store.pipe(
    select(fromExpenses.selectExpenseItems),
    map(entity => Object.values(entity))
  );
  xsMedia$ = this.mediaObserver.media$.pipe(filter(mediaChange => mediaChange.mqAlias === 'xs' ));
  notXsMedia$ = this.mediaObserver.media$.pipe(filter(mediaChange => mediaChange.mqAlias !== 'xs' ));

  constructor(
    private store: Store<AppState>, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, public mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.store.dispatch(fromExpenses.loadExpenseItems());
    this.xsMedia$.subscribe(() => this.displayedColumns = this.displayedColumnsOnXs);
    this.notXsMedia$.subscribe(() => this.displayedColumns = this.displayedColumnsOnOthers);
  }

  onRowSelected(expenseItem: ExpenseItem) {
    this.router.navigate([`./${expenseItem.id}`], { relativeTo: this.route });
  }

  onRowDelete(expenseItem: ExpenseItem, $event: Event): void {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      data: expenseItem
    });

    dialogRef.afterClosed()
      .pipe(filter(result => result))
      .subscribe(() => this.store.dispatch(fromExpenses.deleteExpenseItem({ id: expenseItem.id})));
  }

  onAdd() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }
}
