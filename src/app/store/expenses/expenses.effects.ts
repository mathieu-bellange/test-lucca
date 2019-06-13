import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as ExpensesActions from './expenses.actions';
import { ExpensesService } from './expenses.service';

/**
 * Store effects for Expenses feature
 */
@Injectable()
export class ExpensesEffects {
  constructor(private actions$: Actions, private expensesService: ExpensesService) {}

  /**
   * effect responsible of the loading of expenseItems
   * when ExpensesActions.loadExpenseItems is dispatch
   */
  loadExpenseItems$ = createEffect(() => this.actions$.pipe(
    ofType(ExpensesActions.loadExpenseItems),
    mergeMap(() => this.expensesService.getAll()
      .pipe(
        map(expenseItems => ({ type: ExpensesActions.expenseItemsLoaded.type, payload: expenseItems })),
        catchError(() => EMPTY)
      ))
    )
  );
}
