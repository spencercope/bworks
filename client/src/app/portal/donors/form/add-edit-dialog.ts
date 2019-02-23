import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Donor } from '../../../../../../shared/models/donor';
import { Constants } from '../../../../services/constants';
import { DonorDao } from '../../../../services/dao/donor.dao';
import { Observable } from 'rxjs';
import { UserDao } from '../../../../services/dao/user.dao';

@Component({
  selector: 'add-edit-dialog-donors',
  templateUrl: 'add-edit-dialog.html',
})
export class DonorEditDialog {
  model: Donor;
  donorCategories: any[];

  constructor(
    public dialogRef: MatDialogRef<DonorEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Donor,
    private donorDao: DonorDao,
    private userDao: UserDao
  ) {
    this.model = data;
    this.donorCategories = Constants.ASSET_CATEGORIES;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public save(): void {
    let obs: Observable<Donor>;
    let wasCreated = false;
    if (this.model.id === undefined) {
      obs = this.donorDao.createEntity(this.model);
      wasCreated = true;
    } else {
      obs = this.donorDao.upsertEntity(this.model);
    }
    obs.subscribe(resData => {
      const returnInfo = {
        wasCreated: wasCreated,
        donor: resData,
      };
      this.dialogRef.close(returnInfo);
    });
  }
}
