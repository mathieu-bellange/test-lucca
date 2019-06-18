import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ExpensesStore } from '../../store';

export interface DialogData {
  expenseItemToDelete: ExpensesStore.ExpenseItem
}

/**
 * Expense Item dialog delete confirm
 */
@Component({
  selector: 'app-expense-dialog',
  templateUrl: 'expense-dialog.component.html',
  styleUrls: ['expense-dialog.component.styl'],
})
export class ExpenseDialog {

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
