import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpensesStore } from '../../store';

describe('ExpensesDetailComponent', () => {
  let component: ExpenseDetailComponent;
  let fixture: ComponentFixture<ExpenseDetailComponent>;
  let store: Store<ExpensesStore.State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          expenses: ExpensesStore.reducer
        }),
        NoopAnimationsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule
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
