import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducer } from './reducers';

/**
 * Feature CUrrency NgModule
 * Declare all effects and reducer of currency feature here
 * Declare Service use in effects here too
 */
@NgModule({
  imports: [
    StoreModule.forFeature('currency', reducer),
  ]
})
export class CurrencyModule {}
