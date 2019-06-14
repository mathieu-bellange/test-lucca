import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesDashboardComponent } from './expenses-dashboard';

const expensesRoutes: Routes = [
  { path: 'expenses',  component: ExpensesDashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(expensesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExpensesRoutingModule { }
