import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ExpensesEffects, ExpensesService } from './effects';
import { reducer } from './reducers';

/**
 * Feature Expenses NgModule
 * Declare all effects and reducer of expenses feature here
 * Declare Service use in effects here too
 */
@NgModule({
  imports: [
    StoreModule.forFeature('expenses', reducer),
    EffectsModule.forFeature([ExpensesEffects])
  ],
  providers: [
    ExpensesService
  ]
})
export class ExpensesModule {}
