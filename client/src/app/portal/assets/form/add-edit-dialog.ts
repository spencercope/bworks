import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Asset } from '../../../../../../shared/models/asset';
import { Constants } from '../../../../services/constants';
import { AssetDao } from '../../../../services/dao/asset.dao';
import { Observable } from 'rxjs';
import { UserDao } from '../../../../services/dao/user.dao';

@Component({
  selector: 'add-edit-dialog-assets',
  templateUrl: 'add-edit-dialog.html',
})
export class AssetEditDialog {
  model: Asset;
  assetCategories: any[];

  constructor(
    public dialogRef: MatDialogRef<AssetEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Asset,
    private assetDao: AssetDao,
    private userDao: UserDao
  ) {
    this.model = data;
    this.assetCategories = Constants.ASSET_CATEGORIES;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public save(): void {
    let obs: Observable<Asset>;
    let wasCreated = false;
    if (this.model.id === undefined) {
      this.model.userId = this.userDao.getUserId();
      obs = this.assetDao.createEntity(this.model);
      wasCreated = true;
    } else {
      obs = this.assetDao.upsertEntity(this.model);
    }
    obs.subscribe(resData => {
      const returnInfo = {
        wasCreated: wasCreated,
        asset: resData,
      };
      this.dialogRef.close(returnInfo);
    });
  }
}
