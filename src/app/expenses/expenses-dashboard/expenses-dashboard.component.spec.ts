import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatIconModule, MatDialog, MatDialogRef } from '@angular/material';
import { StoreModule, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { ExpensesDashboardComponent } from './expenses-dashboard.component';
import { ExpensesStore } from '../../store';
import { ExpenseDialogComponent } from '../expense-dialog';

describe('ExpensesDashboardComponent', () => {
  let component: ExpensesDashboardComponent;
  let fixture: ComponentFixture<ExpensesDashboardComponent>;
  let store: Store<ExpensesStore.State>;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<ExpenseDialogComponent>;
  const responseDialog$: Observable<boolean> = of(true);
  beforeEach(async(() => {
    const spyDialog = jasmine.createSpyObj('MatDialog', ['open']);
    const spyDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    spyDialogRef.afterClosed.and.callFake(() => responseDialog$);
    spyDialog.open.and.returnValue(spyDialogRef);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          expenses: ExpensesStore.reducer
        }),
        RouterTestingModule,
        MatTableModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialog, useValue: spyDialog },
        { provide: MatDialogRef, useValue: spyDialogRef }
      ],
      declarations: [
        ExpensesDashboardComponent
      ],
    }).compileComponents();
    dialog = TestBed.get(MatDialog);
    dialogRef = TestBed.get(MatDialogRef);
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

  it('should navigate after a row selection', () => {
    const itemSelected = new ExpensesStore.ExpenseItem({ id: '727212a0-4d73-4615-bd23-d7df6f562491' });
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.onRowSelected(itemSelected);
    expect(router.navigate).toHaveBeenCalledWith([`./${itemSelected.id}`], jasmine.anything());
  });

  it('should navigate on add', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.onAdd();
    expect(router.navigate).toHaveBeenCalledWith(['./add'], jasmine.anything());
  });
});
