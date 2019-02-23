import { Injectable } from '@angular/core';
import { ApiHelper } from './apiHelper';
import { ApiCallFactory } from './apiCallFactory';
import { UserDao } from './dao/user.dao';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user';
import { Constants } from './constants';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {
  apiHelper: ApiHelper;
  apiCallFactory: ApiCallFactory;
  userDao: UserDao;

  constructor(
    apiHelper: ApiHelper,
    apiCallFactory: ApiCallFactory,
    userDao: UserDao
  ) {
    this.apiHelper = apiHelper;
    this.apiCallFactory = apiCallFactory;
    this.userDao = userDao;
  }

  public login(username: string, password: string): Observable<User> {
    const data = {
      grant_type: 'password',
      username: username,
      password: password,
    };

    const authSvc = this;

    const apiCall = this.apiCallFactory.getDefaultApiCallObjectForLogin(data);

    const httpRequest = this.apiHelper.makeApiCall(apiCall);
    return httpRequest.pipe(
      map(loginObj => {
        const loginResponse: any = loginObj;
        const token = loginResponse.token;
        authSvc.userDao.setCurrentUser(loginResponse.user);
        authSvc.apiHelper.setAccessToken(token);
        return loginResponse.user;
      })
    );

    // const observable = Observable.create(function subscribe(observer) {
    //   httpRequest.subscribe(
    //     loginObj => {
    //       const loginResponse: any = loginObj;
    //       const token = loginResponse.token;
    //       authSvc.userDao.setCurrentUser(loginResponse.user);
    //       authSvc.apiHelper.setAccessToken(token);
    //       observer.next(data);
    //       observer.complete();
    //     },
    //     error => {
    //       observer.error(error);
    //     }
    //   );
    // });
    // return observable;
  }

  // public checkSession(): Observable<any> {
  //   let apiCall = this.apiCallFactory.getDefaultApiCallObjectForSessionCheck({});

  //   let authSvc = this;

  //   let httpRequest = this.apiHelper.makeApiCall(apiCall);
  //   let observable = Observable.create(function subscribe(observer) {
  //     httpRequest.subscribe(
  //       sessionData => {
  //         observer.next(sessionData);
  //         let user: any = sessionData;
  //         authSvc.userDao.setCurrentUser(user);
  //         observer.complete();
  //       },
  //       error => {
  //         authSvc.apiHelper.setAccessToken(null);
  //         observer.error(error);
  //       }
  //     )
  //   });
  //   return observable;
  // }
}
