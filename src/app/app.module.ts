import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/store.module';
import { ExpensesModule } from './expenses/expenses.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppStoreModule,
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    NoopAnimationsModule,
    ExpensesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
