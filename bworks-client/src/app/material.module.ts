import {NgModule} from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';





const modules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  ToolbarModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {
}
