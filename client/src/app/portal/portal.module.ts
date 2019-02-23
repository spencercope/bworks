import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { MaterialModule } from '../../shared-client/material/material.module';
import {AssetsModule} from './assets/assets.module';
import {ItemsModule} from './items/items.module';
import {DonorsModule} from './donors/donors.module';
import {DonationFlowModule} from './donation-flow/donation-flow.module';
import {UsersModule} from './users/users.module';

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    ItemsModule,
    DonorsModule,
    DonationFlowModule,
    UsersModule,
  ],
  declarations: [PortalComponent],
  exports: [PortalComponent],
  providers: [],
})
export class PortalModule {}
