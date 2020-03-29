import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsMainComponent } from './results-main/results-main.component';
import { ResultItemComponent } from './result-item/result-item.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [ResultsMainComponent, ResultItemComponent, MapComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ResultsModule { }
