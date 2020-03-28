import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { LanguagesPageComponent } from './home-page/languages-page/languages-page.component';



@NgModule({
  declarations: [HomePageComponent, LanguagesPageComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    CommonModule,
    MatSliderModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
  ]
})
export class ModulesModule { }
