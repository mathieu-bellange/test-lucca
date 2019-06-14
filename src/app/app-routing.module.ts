import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Default route of the app
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/expenses',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/expenses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
