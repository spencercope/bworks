import { ApiHelper } from '../apiHelper';
import { Constants } from '../constants';
import { ApiCall } from '../../../../shared/models/apiCall';
import { ApiCallFactory } from '../apiCallFactory';
import { Observable } from 'rxjs';
import { Donor } from '../../../../shared/models/donor';
import { Injectable } from '@angular/core';
import { BaseDao } from './base.dao';

@Injectable()
export class DonorDao extends BaseDao {
  apiHelper: ApiHelper;
  apiCallFactory: ApiCallFactory;

  constructor(apiHelper: ApiHelper, apiCallFactory: ApiCallFactory) {
    super(apiHelper, apiCallFactory, Constants.API.RESOURCES.DONORS);
    this.apiHelper = apiHelper;
    this.apiCallFactory = apiCallFactory;
  }
}
