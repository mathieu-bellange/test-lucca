import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as moment from 'moment';

import { ExpensesEffects } from './expenses.effects';
import { ExpensesService } from './expenses.service';
import { selectExpenseItemById } from './expenses.selectors';
import * as Actions from './expenses.actions';
import { ExpenseItem, Currency, Amount } from './model';
import { AppState } from '../index';

describe('ExpensesEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ExpensesEffects;
  let expensesServiceSpy: jasmine.SpyObj<ExpensesService>;
  let store: MockStore<AppState>;
  const expenseItemStub = new ExpenseItem({
    id: '727212a0-4d73-4615-bd23-d7df6f562491',
    nature: 'test Nature',
    comment: 'test comment',
    originalAmount: new Amount({ amount: 5, currency: Currency.EUR }),
    purchasedOn: moment()
  });

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ExpensesService', ['getAll', 'get', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        ExpensesEffects,
        provideMockStore({
          initialState : { router: {}, entities: {} },
          selectors: [
            { selector: selectExpenseItemById, value: expenseItemStub }
          ]
        }),
        provideMockActions(() => actions),
        { provide: ExpensesService, useValue: spy }
      ]
    });
    store = TestBed.get(Store);
    effects = TestBed.get(ExpensesEffects);
    expensesServiceSpy = TestBed.get(ExpensesService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get all expense item from ExpensesService on loadExpenseItems action', () => {
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
    const stubItems = [stubItem];
    actions = new ReplaySubject(1);
    actions.next(Actions.loadExpenseItems());
    expensesServiceSpy.getAll.and.returnValue(of(stubItems));
    effects.loadExpenseItems$.subscribe(result => {
      expect(result).toEqual(Actions.loadExpenseItemsSuccessful({ payload: stubItems}));
    });
  });

  it('should get expense item from ExpensesService on loadExpenseItemById action', () => {
    const id = '727212a0-4d73-4615-bd23-d7df6f562491';
    const stubItem = {
      id,
      purchasedOn: '2018-12-04',
      nature: 'Restaurant',
      comment: 'test',
      originalAmount: {
        amount: 17.0,
        currency: Currency.GBP
      }
    };
    actions = new ReplaySubject(1);
    actions.next(Actions.loadExpenseItemById({ id }));
    expensesServiceSpy.get.and.returnValue(of(stubItem));
    effects.loadExpenseItemById$.subscribe(result => {
      expect(result).toEqual(Actions.loadExpenseItemByIdSuccessful({ payload: stubItem}));
    });
  });

  it('should update item from ExpensesService on updateExpenseItem action', () => {
    const updateItem = { comment: 'to update' };
    const expectedUpdate: ExpenseItem = Object.assign(new ExpenseItem(), expenseItemStub, updateItem);
    actions = new ReplaySubject(1);
    actions.next(Actions.updateExpenseItem({ payload: updateItem }));
    expensesServiceSpy.put.and.returnValue(of(expectedUpdate));
    effects.updateExpenseItemById$.subscribe(result => {
      expect(expensesServiceSpy.put).toHaveBeenCalledWith(updateItem, expenseItemStub.id);
      expect(result).toEqual(Actions.updateExpenseItemSuccessful({ payload: expectedUpdate}));
    });
  });

  it('should delete expense item from ExpensesService on deleteExpenseItem action', () => {
    const id = '727212a0-4d73-4615-bd23-d7df6f562491';
    actions = new ReplaySubject(1);
    actions.next(Actions.deleteExpenseItem({ id }));
    expensesServiceSpy.delete.and.returnValue(of({ id }));
    effects.deleteExpenseItem$.subscribe(result => {
      expect(expensesServiceSpy.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(Actions.deleteExpenseItemSuccessful({ id }));
    });
  });
});
