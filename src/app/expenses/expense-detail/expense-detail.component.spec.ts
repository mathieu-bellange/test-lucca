import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpensesStore, AppState } from '../../store';
import { EnumToArrayPipe } from '../expenses.pipes';

describe('ExpensesDetailComponent', () => {
  let component: ExpenseDetailComponent;
  let fixture: ComponentFixture<ExpenseDetailComponent>;
  let store: MockStore<AppState>;
  let router: Router;
  const expenseItemStub = new ExpensesStore.ExpenseItem({
    nature: 'test Nature',
    comment: 'test comment',
    originalAmount: new ExpensesStore.Amount({ amount: 5, currency: ExpensesStore.Currency.EUR }),
    purchasedOn: moment()
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatMomentDateModule
      ],
      providers: [
        provideMockStore({
          initialState : { router: {}, entities: {} },
          selectors: [
            { selector: ExpensesStore.selectors.selectExpenseItemById, value: expenseItemStub }
          ]
        })
      ],
      declarations: [
        ExpenseDetailComponent,
        EnumToArrayPipe
      ],
    }).compileComponents();
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ExpenseDetailComponent);
    component = fixture.debugElement.componentInstance;
  }));
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe observable on ngdestroy', () => {
    const spy = jasmine.createSpyObj('test', ['unsubscribe']);
    component.expenseItemSub = spy;
    component.ngOnDestroy();
    expect(spy.unsubscribe).toHaveBeenCalled();
  });

  it('should bind expenseItemById with the form on ngInit', () => {
    component.ngOnInit();
    expect(component.expenseDetailForm.value).toEqual({
      purchasedOn: expenseItemStub.purchasedOn,
      nature: expenseItemStub.nature,
      originalAmount: {
        amount: expenseItemStub.originalAmount.amount,
        currency: expenseItemStub.originalAmount.currency
      },
      comment: expenseItemStub.comment
    });
  });

  it('should dispatch an action to update data onSubmit', () => {
    const action = ExpensesStore.actions.updateExpenseItem({ payload: component.expenseDetailForm.value });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should reset form on cancel', () => {
    spyOn(component.expenseDetailForm, 'reset').and.callThrough();
    component.onBack();
    expect(component.expenseDetailForm.reset).toHaveBeenCalled();
  });

  it('should navigate to dashboard on cancel', () => {
    spyOn(router, 'navigate');
    component.onBack();
    expect(router.navigate).toHaveBeenCalledWith(['../'], jasmine.anything());
  });
});
