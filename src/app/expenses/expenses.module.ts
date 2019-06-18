import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatInputModule, MatTableModule,
  MatDatepickerModule, MatSelectModule, MatButtonModule,
  MatDialogModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ExpensesDashboardComponent } from './expenses-dashboard';
import { ExpenseDetailComponent } from './expense-detail';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { EnumToArrayPipe } from './expenses.pipes';
import { ExpenseDialog } from './expense-dialog';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ExpensesRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ExpensesDashboardComponent,
    ExpenseDetailComponent,
    ExpenseDialog,
    EnumToArrayPipe
  ],
  entryComponents: [ExpenseDialog]
})
export class ExpensesModule { }
