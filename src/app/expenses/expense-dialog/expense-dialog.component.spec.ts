import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { ExpenseDialogComponent } from './expense-dialog.component';

describe('ExpenseDialogComponent', () => {
  let component: ExpenseDialogComponent;
  let fixture: ComponentFixture<ExpenseDialogComponent>;
  let spyDialogRef: MatDialogRef<ExpenseDialogComponent>;
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatDialogModule
      ],
      declarations: [
        ExpenseDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    }).compileComponents();
    spyDialogRef = TestBed.get(MatDialogRef);
    fixture = TestBed.createComponent(ExpenseDialogComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when confirm', () => {
    component.onConfirmClick();
    expect(spyDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should return false when cancel', () => {
    component.onCancelClick();
    expect(spyDialogRef.close).toHaveBeenCalledWith(false);
  });
});
