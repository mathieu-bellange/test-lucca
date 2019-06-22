import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { find } from 'lodash';

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
export class ExpensesDashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[];
  displayedColumnsOnXs: string[] = ['purchasedOn', 'nature', 'amount'];
  displayedColumnsOnOthers: string[] = ['addExpenseItem', 'purchasedOn', 'nature', 'amount', 'delete'];
  dataSource$: Observable<Array<ExpenseItem>> = this.store.pipe(
    select(fromExpenses.selectExpenseItems),
    map(entity => Object.values(entity))
  );
  isXsMedia = (mediaChanges: MediaChange[]) =>
    find(mediaChanges, (value: MediaChange) => value.mqAlias === 'xs');
  xsMedia$ = this.mediaObserver.asObservable().pipe(
    filter(mediaChanges => this.isXsMedia(mediaChanges))
  );
  xsMediaSub: Subscription;
  notXsMediaSub: Subscription;
  notXsMedia$ = this.mediaObserver.asObservable().pipe(
    filter(mediaChanges => !this.isXsMedia(mediaChanges))
  );

  constructor(
    private store: Store<AppState>, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, public mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.store.dispatch(fromExpenses.loadExpenseItems());
    this.xsMediaSub = this.xsMedia$.subscribe(() => this.displayedColumns = this.displayedColumnsOnXs);
    this.notXsMediaSub = this.notXsMedia$.subscribe(() => this.displayedColumns = this.displayedColumnsOnOthers);
  }

  ngOnDestroy() {
    if (this.xsMediaSub) this.xsMediaSub.unsubscribe();
    if (this.notXsMediaSub) this.notXsMediaSub.unsubscribe();
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
