import {Injectable} from '@angular/core';
import {CreateDonorParams, DonorClient, DonorVm} from "../../app.api";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class DonationFlowService {

  constructor(private donorClient: DonorClient) {
  }

  searchDonor(email: string): Observable<DonorVm> {
    return this.donorClient.searchDonor(email);
  }

  createDonor(value: CreateDonorParams): Observable<DonorVm> {
    return this.donorClient.createDonor(value);
  }
}
