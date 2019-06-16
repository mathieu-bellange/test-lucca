import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpensesStore, AppState } from '../../store';

describe('ExpensesDetailComponent', () => {
  let component: ExpenseDetailComponent;
  let fixture: ComponentFixture<ExpenseDetailComponent>;
  let store: MockStore<AppState>;
  const expenseItemStub = new ExpensesStore.ExpenseItem({
    nature: 'test Nature',
    comment: 'test comment',
    originalAmount: new ExpensesStore.Amount({ amount: 5 }),
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
        ExpenseDetailComponent
      ],
    }).compileComponents();
    store = TestBed.get(Store);
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
      amount: expenseItemStub.originalAmount.amount,
      comment: expenseItemStub.comment
    });
  });
});
