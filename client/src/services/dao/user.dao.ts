import { ApiHelper } from '../apiHelper';
import { Constants } from '../constants';
import { ApiCallFactory } from '../apiCallFactory';
import { Injectable } from '@angular/core';
import { BaseDao } from './base.dao';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user';

@Injectable()
export class UserDao extends BaseDao {
  resource: string = Constants.API.RESOURCES.USERS;
  apiHelper: ApiHelper;
  apiCallFactory: ApiCallFactory;

  currentUser: User;
  USER_ID = 'userId';

  constructor(apiHelper: ApiHelper, apiCallFactory: ApiCallFactory) {
    super(apiHelper, apiCallFactory, Constants.API.RESOURCES.USERS);
    this.apiHelper = apiHelper;
    this.apiCallFactory = apiCallFactory;
  }

  public setCurrentUser(user: User): void {
    this.currentUser = user;
    this.setUser();
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getUserId(): number {
    const token = sessionStorage.getItem(this.USER_ID);
    if (token) {
      return Number(token);
    } else {
      return null;
    }
  }

  public setUser(): void {
    sessionStorage.setItem("user",JSON.stringify(this.currentUser) );

  }
}
