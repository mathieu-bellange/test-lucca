import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY} from 'rxjs';
import { map, mergeMap, filter, catchError, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../../index';
import * as reducers from '../reducers';
import { ExpensesService } from './expenses.service';

/**
 * Store effects for Expenses feature
 */
@Injectable()
export class ExpensesEffects {
  constructor(private actions$: Actions, private expensesService: ExpensesService, private store: Store<AppState>) {}

  /**
   * effect responsible of the loading of expenseItems
   * when ExpensesActions.loadExpenseItems is dispatch
   */
  loadExpenseItems$ = createEffect(() => this.actions$.pipe(
    ofType(reducers.loadExpenseItems),
    mergeMap(() => this.expensesService.getAll()
      .pipe(
        map(expenseItems => ({ type: reducers.loadExpenseItemsSuccessful.type, payload: expenseItems })),
        catchError(() => EMPTY)
      ))
    ));

  /**
   * effect responsible of the loading of an expenseItem by id
   * when ExpensesActions.loadExpenseItemById is dispatch
   */
  loadExpenseItemById$ = createEffect(() => this.actions$.pipe(
    ofType(reducers.loadExpenseItemById),
    mergeMap(action => this.expensesService.get(action.id)
      .pipe(
        map(expenseItems => ({ type: reducers.loadExpenseItemByIdSuccessful.type, payload: expenseItems })),
        catchError(() => EMPTY)
      ))
    ));

    /**
     * effect responsible of the updating of an expenseItem by id
     * when ExpensesActions.updateExpenseItem is dispatch
     * filter based on the presence of the entity
     */
    updateExpenseItemById$ = createEffect(() => this.actions$.pipe(
      ofType(reducers.updateExpenseItem),
      withLatestFrom(this.store.pipe(select(reducers.selectExpenseItemById))),
      filter(action => !!action[1]),
      map(action => ({ id: action[1].id, body: action[0].payload })),
      mergeMap(buildReq => this.expensesService.put(buildReq.body, buildReq.id)
        .pipe(
          map(expenseItems => ({ type: reducers.updateExpenseItemSuccessful.type, payload: expenseItems })),
          catchError(() => EMPTY)
        ))
      ));

      /**
       * effect responsible of the creating of a new expenseItem
       * when ExpensesActions.updateExpenseItem is dispatch
       * filter based on the absence of the entity
       */
      createExpenseItem$ = createEffect(() => this.actions$.pipe(
        ofType(reducers.updateExpenseItem),
        withLatestFrom(this.store.pipe(select(reducers.selectExpenseItemById))),
        filter(action => !action[1]),
        map(action => ({ body: action[0].payload })),
        mergeMap(buildReq => this.expensesService.post(buildReq.body)
          .pipe(
            map(expenseItems => ({ type: reducers.updateExpenseItemSuccessful.type, payload: expenseItems })),
            catchError(() => EMPTY)
          ))
        ));

    /**
     * effect responsible of the delete of an expenseItem by id
     * when ExpensesActions.deleteExpenseItem is dispatch
     */
    deleteExpenseItem$ = createEffect(() => this.actions$.pipe(
      ofType(reducers.deleteExpenseItem),
      mergeMap(action => this.expensesService.delete(action.id)
        .pipe(
          map(payload => ({ type: reducers.deleteExpenseItemSuccessful.type, id: payload.id  })),
          catchError(() => EMPTY)
        ))
      ));
}
