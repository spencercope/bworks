import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetDao } from '../../../services/dao/asset.dao';

@Injectable()
export class AssetsResolve implements Resolve<any> {
  constructor(private assetDao: AssetDao) {}

  resolve(route: ActivatedRouteSnapshot) {
    // create sessionStorage manager
    return this.assetDao.getAllFromServerByUserId(
      Number(sessionStorage.getItem('userId'))
    );
  }
}
