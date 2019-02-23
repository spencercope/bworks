import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-client/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CvaDateComponent } from './cva-date.component';

@NgModule({
  imports: [MaterialModule, FormsModule, CommonModule],
  declarations: [CvaDateComponent],
  exports: [CvaDateComponent],
  providers: [],
})
export class CvaDateModule {}
