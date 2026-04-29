import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for Two-way binding (ngModel)

import { AppComponent } from './app.component';
import { StudentCardComponent } from './student-card/student-card.component';

// @NgModule decorator marks this class as an Angular Module
@NgModule({
  // declarations: Array of components that belong to this module
  declarations: [
    AppComponent,
    StudentCardComponent
  ],
  // imports: Array of modules required by this module
  imports: [
    BrowserModule,
    FormsModule // Imported to enable [(ngModel)]
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  // bootstrap: The main component to load when the app starts
  bootstrap: [AppComponent]
})
export class AppModule { }
