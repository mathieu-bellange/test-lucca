import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesDashboardComponent } from './expenses-dashboard';
import { ExpenseDetailComponent } from './expense-detail';

const expensesRoutes: Routes = [
  {
    path: 'expenses',
    component: ExpensesDashboardComponent,
    children: [
      { path: ':id', component: ExpenseDetailComponent }
    ]
  }
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
