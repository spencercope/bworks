import { ApiHelper } from '../apiHelper';
import { ApiCallFactory } from '../apiCallFactory';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseDao {
  resource: string;
  apiHelper: ApiHelper;
  apiCallFactory: ApiCallFactory;

  constructor(
    apiHelper: ApiHelper,
    apiCallFactory: ApiCallFactory,
    resource: string
  ) {
    this.apiHelper = apiHelper;
    this.apiCallFactory = apiCallFactory;
    this.resource = resource;
  }

  public getAllFromServer<T>(): Observable<T[]> {
    const apiCall = this.apiCallFactory.getDefaultApiCallObjectForGet();
    apiCall.url += this.resource;
    return this.apiHelper.makeApiCall(apiCall);
  }

  public getAllFromServerByUserId<T>(userId: number): Observable<T[]> {
    const apiCall = this.apiCallFactory.getDefaultApiCallObjectForGet();
    apiCall.url += this.resource + '/' + userId;
    return this.apiHelper.makeApiCall(apiCall);
  }

  public upsertEntity<T>(dataValues): Observable<T> {
    const apiCall = this.apiCallFactory.getDefaultApiCallObjectForPut(dataValues);
    apiCall.url += this.resource + '/' + dataValues.id;
    return this.apiHelper.makeApiCall(apiCall);
  }

  public createEntity<T>(dataValues): Observable<T> {
    const apiCall = this.apiCallFactory.getDefaultApiCallObjectForPost(
      dataValues
    );
    apiCall.url += this.resource;
    return this.apiHelper.makeApiCall(apiCall);
  }
}
