import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../shared-client/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleMessageDialog } from './title-message-dialog.component';

@NgModule({
  imports: [MaterialModule, FormsModule, CommonModule],
  declarations: [TitleMessageDialog],
  exports: [TitleMessageDialog],
  providers: [],
  entryComponents: [TitleMessageDialog],
})
export class TitleMessageDialogModule {}
