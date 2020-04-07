import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultsMainComponent} from './modules/results/results-main/results-main.component';
import { DetailsviewComponent } from './modules/details/detailsview/detailsview.component';
import {HomePageComponent} from './modules/home-page/home-page.component';
import {SearchCompenentComponent} from './modules/home-page/search-compenent/search-compenent.component';


const routes: Routes = [
  {path: 'results', component: ResultsMainComponent},
  {path: '', component: HomePageComponent},
  {path: 'details/:npi', component: DetailsviewComponent},
  // {path: '', component: SliderButtonComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
