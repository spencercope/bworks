import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserDao } from '../../../services/dao/user.dao';

@Injectable()
export class UsersResolve implements Resolve<any> {
  constructor(private userDao: UserDao) {}

  resolve(route: ActivatedRouteSnapshot) {
    // create sessionStorage manager
    return this.userDao.getAllFromServerByUserId(
      Number(sessionStorage.getItem('userId'))
    );
  }
}
