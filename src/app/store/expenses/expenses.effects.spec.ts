import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of } from 'rxjs';

import { ExpensesEffects } from './expenses.effects';
import { ExpensesService } from './expenses.service';
import * as Actions from './expenses.actions';
import { ExpenseItem, Currency } from './model';

describe('AppEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ExpensesEffects;
  let expensesServiceSpy: jasmine.SpyObj<ExpensesService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ExpensesService', ['getAll']);

    TestBed.configureTestingModule({
      providers: [
        ExpensesEffects,
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

  it('should get all expense item from ExpensesService on loadExpenseItems action', () => {
    const stubItem: ExpenseItem = {
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
});
