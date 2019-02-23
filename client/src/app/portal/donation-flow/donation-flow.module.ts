import { NgModule } from '@angular/core';
import { DonationFlowRoutingModule } from './donation-flow-routing.module';
import { DonationFlowResolve } from './donation-flow-resolve';
import { DonationFlowComponent } from './donation-flow.component';
import { MaterialModule } from '../../../shared-client/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ItemDao} from '../../../services/dao/item.dao';

@NgModule({
  imports: [
    DonationFlowRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule,
  ],
  declarations: [DonationFlowComponent],
  exports: [DonationFlowComponent],
  providers: [ItemDao, DonationFlowResolve],
})
export class DonationFlowModule {}
