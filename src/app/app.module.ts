import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ResultsModule} from './modules/results/results.module';
import {HttpClientModule} from '@angular/common/http';
import { DetailsModule } from './modules/details/details.module';
import {HomePageComponent} from './modules/home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResultsModule,
    HttpClientModule,
    DetailsModule,
    FormsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
