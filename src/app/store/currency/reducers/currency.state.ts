export interface State {
  toEUR: CurrencyRateState;
}

export interface CurrencyRateState {
  fromUSD: number,
  fromGBP: number,
  fromCHF: number,
  fromEUR: number
}

export const initialState: State = {
  toEUR: {
    fromUSD: 0.88,
    fromGBP: 1.12,
    fromCHF: 0.9,
    fromEUR: 1
  }
};
