import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';
import { StoreModule, Store } from '@ngrx/store';

import { ExpensesDashboardComponent } from './expenses-dashboard.component';
import { ExpensesStore } from '../../store';

describe('ExpensesDashboardComponent', () => {
  let component: ExpensesDashboardComponent;
  let fixture: ComponentFixture<ExpensesDashboardComponent>;
  let store: Store<ExpensesStore.State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          expenses: ExpensesStore.reducer
        }),
        RouterTestingModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      declarations: [
        ExpensesDashboardComponent
      ],
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ExpensesDashboardComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load data when created', () => {
    const action = ExpensesStore.actions.loadExpenseItems();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display a list of items after the data is loaded', () => {
    const item = {
      id: '727212a0-4d73-4615-bd23-d7df6f562491',
      purchasedOn: '2018-12-04',
      nature: 'Restaurant',
      comment: 'comment',
      originalAmount: {
        amount: 17.0,
        currency: ExpensesStore.Currency.GBP
      }
    };
    const items = [item];
    const action = ExpensesStore.actions.loadExpenseItemsSuccessful({ payload: items});
    store.dispatch(action);
    component.dataSource$.subscribe(data => {
      expect(data.length).toBe(items.length);
    });
  });
});
