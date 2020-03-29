import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultsMainComponent} from './modules/results/results-main/results-main.component';
import { DetailsviewComponent } from './modules/details/detailsview/detailsview.component';
import {HomePageComponent} from './modules/home-page/home-page.component';


const routes: Routes = [
  {path: 'results', component: ResultsMainComponent},
  {path: '', component: HomePageComponent}, // Replace with your own main componen
  {path: 'details', component: DetailsviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
