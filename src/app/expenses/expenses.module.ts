import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';

import { ExpensesDashboardComponent } from './expenses-dashboard';
import { ExpensesRoutingModule } from './expenses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    MatTableModule
  ],
  declarations: [ExpensesDashboardComponent]
})
export class ExpensesModule { }
