import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State, CurrencyRateState } from './currency.state';
import { AppState } from '../../index';
import { Currency } from '../../model';

export const selectCurrency = createFeatureSelector<AppState, State>('currency')

export const selectToEuro = createSelector(
  selectCurrency,
  (state: State) => state.toEUR
);

export const rateToEuro = createSelector(
  selectCurrency,
  selectToEuro,
  (state: State, rateState: CurrencyRateState, props: { currency: Currency }) => rateState[`from${props.currency}`]
);
