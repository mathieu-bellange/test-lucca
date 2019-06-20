export interface State {
  fromUSD: { toEUR: number };
  fromGBP: { toEUR: number };
  fromCHF: { toEUR: number };
}

export const initialState: State = {
  fromUSD: { toEUR: 1.13 },
  fromGBP: { toEUR: 0.89 },
  fromCHF: { toEUR: 1.11 }
};
