
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsviewComponent } from './detailsview/detailsview.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [DetailsviewComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class DetailsModule { }
