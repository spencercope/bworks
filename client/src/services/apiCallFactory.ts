import { ApiCall } from '../../../shared/models/apiCall';
import { ApiHelper } from './apiHelper';
import { Constants } from './constants';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiCallFactory {
  apiCall: ApiCall;
  apiHelper: ApiHelper;

  constructor(apiHelper: ApiHelper) {
    this.apiCall = new ApiCall();
    this.apiHelper = apiHelper;
  }

  getDefaultApiCallObjectForGet(): ApiCall {
    this.apiCall.url = this.apiHelper.getServiceEndpoint();
    this.apiCall.method = Constants.API.VERBS.GET;
    this.apiCall.data = {};
    this.apiCall.params = null;
    return this.apiCall;
  }

  getDefaultApiCallObjectForPut(data): ApiCall {
    this.apiCall.url = this.apiHelper.getServiceEndpoint();
    this.apiCall.method = Constants.API.VERBS.PUT;
    this.apiCall.data = data;
    this.apiCall.params = null;
    return this.apiCall;
  }

  getDefaultApiCallObjectForPost(data: any): ApiCall {
    this.apiCall.url = this.apiHelper.getServiceEndpoint();
    this.apiCall.method = Constants.API.VERBS.POST;
    this.apiCall.data = data;
    this.apiCall.params = null;
    return this.apiCall;
  }

  getDefaultApiCallObjectForLogin(data: any): ApiCall {
    this.apiCall.url =
      this.apiHelper.getServiceEndpoint() + Constants.API.RESOURCES.LOGIN;
    this.apiCall.method = Constants.API.VERBS.POST;
    this.apiCall.data = data;
    this.apiCall.params = null;
    return this.apiCall;
  }

  getDefaultApiCallObjectForSessionCheck(data: any): ApiCall {
    this.apiCall.url =
      this.apiHelper.getServiceEndpoint() + Constants.API.RESOURCES.SESSION;
    this.apiCall.method = Constants.API.VERBS.GET;
    this.apiCall.data = data;
    this.apiCall.params = null;
    return this.apiCall;
  }
}
