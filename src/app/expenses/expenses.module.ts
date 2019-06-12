import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesDashboardComponent } from './expenses-dashboard';
import { ExpensesRoutingModule } from './expenses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule
  ],
  declarations: [ExpensesDashboardComponent]
})
export class ExpensesModule { }
