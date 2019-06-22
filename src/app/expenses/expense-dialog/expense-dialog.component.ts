import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ExpenseItem } from '../../store';

/**
 * Expense Item dialog delete confirm
 */
@Component({
  selector: 'app-expense-dialog',
  templateUrl: 'expense-dialog.component.html',
  styleUrls: ['expense-dialog.component.styl'],
})
export class ExpenseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseItem) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
