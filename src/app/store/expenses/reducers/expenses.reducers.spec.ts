import { createAction } from '@ngrx/store';

import { reducer } from './expenses.reducers';
import { State } from './expenses.state';
import * as actions from './expenses.actions';
import { ExpenseItem, Currency } from '../../model';

describe('Expenses reducer', () => {
  it('should return the default state on unknown action', () => {
    const initialState: State = { ids: [], entities: {}};
    const action = createAction('unknown');
    const state = reducer(initialState, action);
    expect(state).toBe(initialState);
  });
  it('should return the new state on action loadExpenseItemsSuccessful', () => {
    const initialState: State = { ids: [], entities: {}};
    const stubItem = {
      id: '727212a0-4d73-4615-bd23-d7df6f562491',
      purchasedOn: '2018-12-04',
      nature: 'Restaurant',
      comment: 'test',
      originalAmount: {
        amount: 17.0,
        currency: Currency.GBP
      }
    };
    const expectedState: State = { ids: [stubItem.id], entities: { [stubItem.id]: new ExpenseItem(stubItem) }};
    const action = actions.loadExpenseItemsSuccessful({ payload: { items: [stubItem], count: 1 } });
    const state = reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
  describe('Expense Item reducer', () => {
    it('should return the new state on action loadExpenseItemByIdSuccessful', () => {
      const stubItem: ExpenseItem = new ExpenseItem({
        id: '727212a0-4d73-4615-bd23-d7df6f562491',
        purchasedOn: '2018-12-04',
        nature: 'Restaurant',
        comment: 'test',
        originalAmount: {
          amount: 17.0,
          currency: Currency.GBP
        }
      });
      const stubItemRemote = {
        id: '727212a0-4d73-4615-bd23-d7df6f562491',
        purchasedOn: '2018-12-04',
        nature: 'Restaurant',
        comment: 'test 2',
        originalAmount: {
          amount: 17.0,
          currency: Currency.GBP
        }
      };
      const initialState: State = { ids: [stubItem.id], entities: { [stubItem.id]: stubItem }};
      const expectedState: State = { ids: [stubItem.id], entities: { [stubItem.id]: new ExpenseItem(stubItemRemote) }};
      const action = actions.loadExpenseItemByIdSuccessful({ payload: stubItemRemote });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
    it('should return the new state on action updateExpenseItemSuccessful', () => {
      const stubItem: ExpenseItem = new ExpenseItem({
        id: '727212a0-4d73-4615-bd23-d7df6f562491',
        purchasedOn: '2018-12-04',
        nature: 'Restaurant',
        comment: 'test',
        originalAmount: {
          amount: 17.0,
          currency: Currency.GBP
        }
      });
      const stubItemRemote = {
        id: '727212a0-4d73-4615-bd23-d7df6f562491',
        purchasedOn: '2018-12-04',
        nature: 'Restaurant',
        comment: 'test 2',
        originalAmount: {
          amount: 17.0,
          currency: Currency.GBP
        }
      };
      const initialState: State = { ids: [stubItem.id], entities: { [stubItem.id]: stubItem }};
      const expectedState: State = { ids: [stubItem.id], entities: { [stubItem.id]: new ExpenseItem(stubItemRemote) }};
      const action = actions.updateExpenseItemSuccessful({ payload: stubItemRemote });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
    it('should return the new state on action deleteExpenseItemSuccessful', () => {
      const stubItem: ExpenseItem = new ExpenseItem({
        id: '727212a0-4d73-4615-bd23-d7df6f562491',
        purchasedOn: '2018-12-04',
        nature: 'Restaurant',
        comment: 'test',
        originalAmount: {
          amount: 17.0,
          currency: Currency.GBP
        }
      });
      const initialState: State = { ids: [stubItem.id], entities: { [stubItem.id]: stubItem }};
      const expectedState: State = { ids: [], entities: { }};
      const action = actions.deleteExpenseItemSuccessful({ id: stubItem.id });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });

    it('should return the new state on action createExpenseItemSuccessful', () => {
      const stubItem: ExpenseItem = new ExpenseItem({
        id: 'new id',
        purchasedOn: '2018-12-04',
        nature: 'Restaurant',
        comment: 'test',
        originalAmount: {
          amount: 17.0,
          currency: Currency.GBP
        },
        convertedAmount: {
          amount: 17,
          currency: Currency.EUR
        }
      });
      const initialState: State = { ids: [], entities: { }};
      const expectedState: State = { ids: [stubItem.id], entities: { [stubItem.id]: stubItem }};
      const action = actions.createExpenseItemSuccessful({ payload: stubItem });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
