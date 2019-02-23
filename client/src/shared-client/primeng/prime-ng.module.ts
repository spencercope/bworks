import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
  ],
  imports: [
    TableModule,
    SliderModule,
    DropdownModule,
    DialogModule
  ],
  exports: [
    TableModule,
    SliderModule,
    DropdownModule,
    DialogModule
  ],
  providers: [],
})
export class PrimeNgModule {}
