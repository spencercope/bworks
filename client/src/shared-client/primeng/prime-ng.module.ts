import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
  ],
  imports: [
    TableModule,
    SliderModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule
  ],
  exports: [
    TableModule,
    SliderModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule
  ],
  providers: [],
})
export class PrimeNgModule {}
