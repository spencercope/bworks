import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../shared-client/material/material.module';
import { AssetEditDialog } from './add-edit-dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CvaDateModule } from '../../../../shared-client/cva-date/cva-date.module';

@NgModule({
  imports: [MaterialModule, FormsModule, CommonModule, CvaDateModule],
  declarations: [AssetEditDialog],
  exports: [AssetEditDialog],
  providers: [],
  entryComponents: [AssetEditDialog],
})
export class AssetEditFormModule {}
