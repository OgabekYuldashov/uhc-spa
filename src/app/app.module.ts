import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ResultsModule} from './modules/results/results.module';
import {HttpClientModule} from '@angular/common/http';
import { DetailsModule } from './modules/details/details.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResultsModule,
    HttpClientModule,
    DetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
