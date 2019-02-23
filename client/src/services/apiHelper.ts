import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from './constants';
import { ApiCall } from '../../../shared/models/apiCall';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TitleMessageDialog } from '../shared-client/dialog/title-message-dialog/title-message-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class ApiHelper {
  private env: string;
  private accessToken: string;
  private serviceEndpoint: string;
  private JWT = 'jwt';

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  public setEnv(env: string): void {
    this.env = env;
    switch (env) {
      case 'local':
        this.serviceEndpoint = Constants.API.ENDPOINTS.LOCAL;
        break;
      case 'prod':
        this.serviceEndpoint = Constants.API.ENDPOINTS.PROD;
        break;
    }
  }

  public getServiceEndpoint(): string {
    return this.serviceEndpoint;
  }

  public getAccessToken(): string {
    const token = sessionStorage.getItem(this.JWT);
    if (token) {
      return token;
    } else {
      return null;
    }
  }

  public setAccessToken(value: string): void {
    sessionStorage.setItem(this.JWT, value);
  }

  public makeApiCall<T>(apiCall: ApiCall): Observable<T> {
    const reqOptions: any = {
      headers: apiCall.headers,
      body: apiCall.data,
      params: apiCall.params,
    };
    reqOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.getAccessToken()) {
      reqOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getAccessToken(),
      });
    }
    console.log(apiCall);
    const that = this;
    const obs = Observable.create(function subscribe(observer) {
      const httpReq = that.http.request(apiCall.method, apiCall.url, reqOptions);
      httpReq.subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          that.handleApiError(error);
          observer.error(error);
        }
      );
    });
    return obs;
  }

  public handleApiError(apiError): void {
    console.log(apiError);
    switch (apiError.status) {
      case 401:
        this.displayApiError({
          title: 'Unauthorized',
          message: 'Please refresh or log in again.',
        });
        this.router.navigate(['/login']);
        break;
      case 403:
        this.displayApiError({
          title: 'Forbidden',
          message: 'Don\'t do that.',
        });
        this.router.navigate(['/login']);
        break;
      default:
        this.displayApiError({
          title: 'Things Happen',
          message: 'It\'s all they ever do.',
        });
    }
  }

  private displayApiError(msgObject): void {
    const dialogRef = this.dialog.open(TitleMessageDialog, {
      width: '250px',
      data: msgObject,
    });

    dialogRef.afterClosed().subscribe(returnInfo => {});
  }
}
