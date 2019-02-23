import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../shared-client/material/material.module';
import { DonorEditDialog } from './add-edit-dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CvaDateModule } from '../../../../shared-client/cva-date/cva-date.module';

@NgModule({
  imports: [MaterialModule, FormsModule, CommonModule, CvaDateModule],
  declarations: [DonorEditDialog],
  exports: [DonorEditDialog],
  providers: [],
  entryComponents: [DonorEditDialog],
})
export class DonorEditFormModule {}
