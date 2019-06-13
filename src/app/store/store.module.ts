import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ExpensesModule } from './expenses/expenses.module';

/**
 * Root NgModule of the Store
 * Assemble all feature store module
 */
@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ExpensesModule
  ]
})
export class AppStoreModule { }
