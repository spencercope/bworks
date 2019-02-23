import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
  ],
  imports: [
    TableModule,
    SliderModule,
    DropdownModule,
  ],
  exports: [
    TableModule,
    SliderModule,
    DropdownModule,
  ],
  providers: [],
})
export class PrimeNgModule {}
