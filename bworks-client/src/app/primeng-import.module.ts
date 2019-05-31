import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';


const modules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  ToolbarModule,
  ToastModule,
  DialogModule,
  DynamicDialogModule,
  InputSwitchModule,
  DropdownModule,
  TableModule,
  PanelModule,
  CalendarModule,
  InputTextareaModule,
  FileUploadModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [MessageService, DialogService],
})
export class PrimeImportModule {}
