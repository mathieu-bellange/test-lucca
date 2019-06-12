import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as ExpensesStore from './expenses';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({
      expenseItems: ExpensesStore.reducer
    }),
    EffectsModule.forRoot([ExpensesStore.effects]),
  ],
  providers: [
    ExpensesStore.service
  ]
})
export class AppStoreModule { }
