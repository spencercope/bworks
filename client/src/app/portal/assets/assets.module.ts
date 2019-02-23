import { NgModule } from '@angular/core';
import { AssetsRoutingModule } from './assets-routing.module';
import { AssetDao } from '../../../services/dao/asset.dao';
import { AssetsResolve } from './assets-resolve';
import { AssetEditFormModule } from './form/add-edit-dialog.module';
import { AssetsComponent } from './assets.component';
import { MaterialModule } from '../../../shared-client/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    AssetsRoutingModule,
    AssetEditFormModule,
    MaterialModule,
    FormsModule,
    CommonModule,
  ],
  declarations: [AssetsComponent],
  exports: [AssetsComponent],
  providers: [AssetDao, AssetsResolve],
})
export class AssetsModule {}
