import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { NgxTaiuiModule } from 'ngx-taiui';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
    imports: [
        BrowserModule,
        NgxTaiuiModule.forRoot(),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
