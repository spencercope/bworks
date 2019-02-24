import { NgModule } from '@angular/core';
import { DonorsRoutingModule } from './donors-routing.module';
import { DonorDao } from '../../../services/dao/donor.dao';
import { DonorsResolve } from './donors-resolve';
import { DonorEditFormModule } from './form/add-edit-dialog.module';
import { DonorsComponent } from './donors.component';
import { MaterialModule } from '../../../shared-client/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../../shared-client/primeng/prime-ng.module';

@NgModule({
  imports: [
    DonorsRoutingModule,
    DonorEditFormModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    PrimeNgModule,
  ],
  declarations: [DonorsComponent],
  exports: [DonorsComponent],
  providers: [DonorDao, DonorsResolve],
})
export class DonorsModule {}
