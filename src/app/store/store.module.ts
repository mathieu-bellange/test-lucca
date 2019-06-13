import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as ExpensesStore from './expenses';

/**
 * Root NgModule of the Store
 * Declare all effects and reducers here
 */
@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({
      expenses: ExpensesStore.reducer
    }),
    EffectsModule.forRoot([ExpensesStore.effects]),
  ],
  providers: [
    ExpensesStore.service
  ]
})
export class AppStoreModule { }
