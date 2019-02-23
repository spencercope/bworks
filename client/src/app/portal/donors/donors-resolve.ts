import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DonorDao } from '../../../services/dao/donor.dao';

@Injectable()
export class DonorsResolve implements Resolve<any> {
  constructor(private donorDao: DonorDao) {}

  resolve(route: ActivatedRouteSnapshot) {
    // create sessionStorage manager
    return this.donorDao.getAllFromServerByUserId(
      Number(sessionStorage.getItem('userId'))
    );
  }
}
