import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultsMainComponent} from './modules/results/results-main/results-main.component';
import {HomePageComponent} from './modules/home-page/home-page.component';
import {LanguagesPageComponent} from './modules/home-page/languages-page/languages-page.component';


const routes: Routes = [
  {path: 'results', component: ResultsMainComponent},
  {path: '', component: LanguagesPageComponent} // Replace with your own main component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
