import { NgModule } from '@angular/core';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemDao } from '../../../services/dao/item.dao';
import { ItemsResolve } from './items-resolve';
import { ItemsComponent } from './items.component';
import { MaterialModule } from '../../../shared-client/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/shared-client/primeng/prime-ng.module';

@NgModule({
  imports: [
    ItemsRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    PrimeNgModule
  ],
  declarations: [ItemsComponent],
  exports: [ItemsComponent],
  providers: [ItemDao, ItemsResolve],
})
export class ItemsModule {}
