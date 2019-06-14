import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpensesStore } from '../../store';

describe('ExpensesDashboardComponent', () => {
  let component: ExpenseDetailComponent;
  let fixture: ComponentFixture<ExpenseDetailComponent>;
  let store: Store<ExpensesStore.State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          expenses: ExpensesStore.reducer
        }),
        RouterTestingModule
      ],
      declarations: [
        ExpenseDetailComponent
      ],
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ExpenseDetailComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
