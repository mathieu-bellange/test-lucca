import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';

import { ExpensesEffects } from './expenses.effects';
import { ExpensesService } from './expenses.service';
import * as reducers from '../reducers';
import { ExpenseItem, Currency, Amount } from '../../model';

describe('ExpensesEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ExpensesEffects;
  let expensesServiceSpy: jasmine.SpyObj<ExpensesService>;
  const expenseItemStub = new ExpenseItem({
    id: '727212a0-4d73-4615-bd23-d7df6f562491',
    nature: 'test Nature',
    comment: 'test comment',
    originalAmount: new Amount({ amount: 5, currency: Currency.USD }),
    convertedAmount: new Amount({ amount: 2.5, currency: Currency.EUR }),
    purchasedOn: moment()
  });

  describe('expense-detail effects without id', () => {
    beforeEach(() => {
      const spy = jasmine.createSpyObj('ExpensesService', ['post', 'convertedAmount']);
      TestBed.configureTestingModule({
        providers: [
          ExpensesEffects,
          provideMockStore({
            initialState : { router: {}, entities: {}, currency: { toEUR: { fromUSD: 0.5}} },
            selectors: [
              { selector: reducers.selectExpenseItemById, value: null }
            ]
          }),
          provideMockActions(() => actions),
          { provide: ExpensesService, useValue: spy }
        ]
      });
      effects = TestBed.get(ExpensesEffects);
      expensesServiceSpy = TestBed.get(ExpensesService);
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
    });

    it('should create item from ExpensesService on updateExpenseItem action', (done: DoneFn) => {
      const createItem = {
        date: moment(),
        nature: 'test',
        originalAmount: {
          amount: 2,
          currency: 'USD'
        },
        comment: 'to create'
      };
      const afterUpdateAmount: any = Object.assign({}, createItem,
        { convertedAmount: { amount: 1, currency: Currency.EUR} }
      );
      const expectedCreate = Object.assign({}, afterUpdateAmount,
        { id: 'test' }
      );
      actions = new ReplaySubject(1);
      actions.next(reducers.updateExpenseItem({ payload: createItem }));
      expensesServiceSpy.convertedAmount.and.returnValue(of(afterUpdateAmount));
      expensesServiceSpy.post.and.returnValue(of(expectedCreate));
      effects.createExpenseItem$.subscribe(result => {
        expect(expensesServiceSpy.post).toHaveBeenCalledWith(afterUpdateAmount);
        expect(result).toEqual(reducers.updateExpenseItemSuccessful({ payload: expectedCreate}));
        done();
      });
    });
  });

  describe('expense-detail effects with id', () => {
    beforeEach(() => {
      const spy = jasmine.createSpyObj('ExpensesService', ['getAll', 'get', 'put', 'delete', 'convertedAmount']);
      TestBed.configureTestingModule({
        providers: [
          ExpensesEffects,
          provideMockStore({
            initialState : { router: {}, entities: {}, currency: { toEUR: { fromUSD: 0.5}} },
            selectors: [
              { selector: reducers.selectExpenseItemById, value: expenseItemStub }
            ]
          }),
          provideMockActions(() => actions),
          { provide: ExpensesService, useValue: spy }
        ]
      });
      effects = TestBed.get(ExpensesEffects);
      expensesServiceSpy = TestBed.get(ExpensesService);
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
    });

    it('should get all expense item from ExpensesService on loadExpenseItems action', (done: DoneFn) => {
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
      actions.next(reducers.loadExpenseItems());
      expensesServiceSpy.getAll.and.returnValue(of(stubItems));
      effects.loadExpenseItems$.subscribe(result => {
        expect(result).toEqual(reducers.loadExpenseItemsSuccessful({ payload: stubItems}));
        done();
      });
    });

    it('should get expense item from ExpensesService on loadExpenseItemById action', (done: DoneFn) => {
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
      actions.next(reducers.loadExpenseItemById({ id }));
      expensesServiceSpy.get.and.returnValue(of(stubItem));
      effects.loadExpenseItemById$.subscribe(result => {
        expect(result).toEqual(reducers.loadExpenseItemByIdSuccessful({ payload: stubItem}));
        done();
      });
    });

    it('should update item from ExpensesService on updateExpenseItem action', (done: DoneFn) => {
      const updateItem = { comment: 'to update', originalAmount: { amount: 4 } };
      const expectedUpdate = Object.assign(expenseItemStub, updateItem, { convertedAmount: { amount: 2 }});
      actions = new ReplaySubject(1);
      actions.next(reducers.updateExpenseItem({ payload: updateItem }));
      expensesServiceSpy.convertedAmount.and.returnValue(of(expectedUpdate));
      expensesServiceSpy.put.and.returnValue(of(expectedUpdate));
      effects.updateExpenseItemById$.subscribe(result => {
        expect(expensesServiceSpy.put).toHaveBeenCalledWith(expectedUpdate, expenseItemStub.id);
        expect(result).toEqual(reducers.updateExpenseItemSuccessful({ payload: expectedUpdate}));
        done();
      });
    });

    it('should delete expense item from ExpensesService on deleteExpenseItem action', (done: DoneFn) => {
      const id = '727212a0-4d73-4615-bd23-d7df6f562491';
      actions = new ReplaySubject(1);
      actions.next(reducers.deleteExpenseItem({ id }));
      expensesServiceSpy.delete.and.returnValue(of({ id }));
      effects.deleteExpenseItem$.subscribe(result => {
        expect(expensesServiceSpy.delete).toHaveBeenCalledWith(id);
        expect(result).toEqual(reducers.deleteExpenseItemSuccessful({ id }));
        done();
      });
    });
  });

});
