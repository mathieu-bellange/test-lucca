import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatTableModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ExpensesDashboardComponent } from './expenses-dashboard';
import { ExpenseDetailComponent } from './expense-detail';
import { ExpensesRoutingModule } from './expenses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ExpensesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  declarations: [
    ExpensesDashboardComponent,
    ExpenseDetailComponent
  ]
})
export class ExpensesModule { }
