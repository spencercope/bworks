import {NgModule} from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';






const modules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  ToolbarModule,
  ToastModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers:[MessageService]
})
export class MaterialModule {
}
