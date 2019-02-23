import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { MaterialModule } from '../../shared-client/material/material.module';
import {AssetsModule} from './assets/assets.module';

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    AssetsModule
  ],
  declarations: [PortalComponent],
  exports: [PortalComponent],
  providers: [],
})
export class PortalModule {}
