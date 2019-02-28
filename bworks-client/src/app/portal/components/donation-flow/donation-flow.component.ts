import {Component, OnInit} from '@angular/core';
import {DonationFlowService} from "../../services/donation-flow.service";
import {DonorVm} from "../../../app.api";
import {CreateDonationComponent} from "./create-donation/create-donation.component";
import {CreateDonorComponent} from "./create-donor/create-donor.component";

@Component({
  selector: 'app-donation-flow',
  templateUrl: './donation-flow.component.html',
  styleUrls: ['./donation-flow.component.scss']
})
export class DonationFlowComponent implements OnInit {
  email: string;

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
        this.openDialog(donor);
      });
  }

  createNewDonor() {
    // const ref = this.dialog.open(CreateDonorComponent, {
    //   width: '800px',
    //   height: '400px',
    // });

    // ref.afterClosed().subscribe((donor: DonorVm) => {
    //   this.openDialog(donor);
    // });
  }

  private openDialog(donor: DonorVm) {
    // const ref = this.dialog.open(CreateDonationComponent, {
    //   data: donor,
    //   height: '700px',
    //   width: '700px'
    // });

    // ref.afterClosed().subscribe(_ => {
    //   this.email = '';
    // });
  }
}
