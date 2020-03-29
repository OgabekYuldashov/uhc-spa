import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ResultsModule} from './modules/results/results.module';
import {HttpClientModule} from '@angular/common/http';
import {DetailsModule} from './modules/details/details.module';
import {HomePageComponent} from './modules/home-page/home-page.component';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {SearchCompenentComponent} from "./modules/home-page/search-compenent/search-compenent.component";

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchCompenentComponent
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
  exports: [SearchCompenentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
