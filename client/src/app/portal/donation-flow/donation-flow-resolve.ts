import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ItemDao } from '../../../services/dao/item.dao';

@Injectable()
export class DonationFlowResolve implements Resolve<any> {
  constructor(private itemDao: ItemDao) {}

  resolve(route: ActivatedRouteSnapshot) {
    // create sessionStorage manager
    return this.itemDao.getAllFromServer();
  }
}
