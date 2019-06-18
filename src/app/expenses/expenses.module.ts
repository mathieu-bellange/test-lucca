import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatInputModule, MatTableModule,
  MatDatepickerModule, MatSelectModule, MatButtonModule,
  MatDialogModule, MatIconModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ExpensesDashboardComponent } from './expenses-dashboard';
import { ExpenseDetailComponent } from './expense-detail';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { EnumToArrayPipe } from './expenses.pipes';
import { ExpenseDialogComponent } from './expense-dialog';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ExpensesRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ExpensesDashboardComponent,
    ExpenseDetailComponent,
    ExpenseDialogComponent,
    EnumToArrayPipe
  ],
  entryComponents: [ExpenseDialogComponent]
})
export class ExpensesModule { }
