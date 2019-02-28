import {Component, OnInit} from '@angular/core';
import {DonationFlowService} from "../../services/donation-flow.service";
import {DonorVm} from "../../../app.api";


@Component({
  selector: 'app-donation-flow',
  templateUrl: './donation-flow.component.html',
  styleUrls: ['./donation-flow.component.scss']
})
export class DonationFlowComponent implements OnInit {
  email: string;
  donor: DonorVm;
  showDonorForm: boolean =false;
  showDonationForm: boolean = false;

  constructor(private donationFlowService: DonationFlowService) {
  }

  ngOnInit() {
  }

  search() {
    if (!this.email) {
      return;
    }

    this.donationFlowService.searchDonor(this.email)
      .subscribe(donor => {
        this.donor = donor;
        this.openDonationDialog();
      });
  }

  createNewDonor() {
    this.showDonorForm = true;
  }

  private openDonationDialog() {
    this.showDonationForm= true;
  }
  onDonorFormClose(donor){
    this.showDonorForm = false;
    if(donor){
      this.donor = donor;
      this.openDonationDialog();
    }
  }
  onDonationFormClose(){
    this.showDonationForm = false;
  }
}
