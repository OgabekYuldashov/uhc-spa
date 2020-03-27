import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultsMainComponent} from './modules/results/results-main/results-main.component';


const routes: Routes = [
  {path: 'results', component: ResultsMainComponent},
  {path: '', component: ResultsMainComponent} // Replace with your own main component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
