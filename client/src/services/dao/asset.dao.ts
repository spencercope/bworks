import { ApiHelper } from '../apiHelper';
import { Constants } from '../constants';
import { ApiCall } from '../../../../shared/models/apiCall';
import { ApiCallFactory } from '../apiCallFactory';
import { Observable } from 'rxjs';
import { Asset } from '../../../../shared/models/asset';
import { Injectable } from '@angular/core';
import { BaseDao } from './base.dao';

@Injectable()
export class AssetDao extends BaseDao {
  resource: string = Constants.API.RESOURCES.ASSETS;
  apiHelper: ApiHelper;
  apiCallFactory: ApiCallFactory;

  constructor(apiHelper: ApiHelper, apiCallFactory: ApiCallFactory) {
    super(apiHelper, apiCallFactory, Constants.API.RESOURCES.ASSETS);
    this.apiHelper = apiHelper;
    this.apiCallFactory = apiCallFactory;
  }
}
