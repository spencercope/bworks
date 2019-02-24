import {Component, OnInit} from '@angular/core';
import {DonationFlowService} from "../../../services/donation-flow.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateDonorParams} from "../../../../app.api";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-donor',
  templateUrl: './create-donor.component.html',
  styleUrls: ['./create-donor.component.scss']
})
export class CreateDonorComponent implements OnInit {

  form: FormGroup;

  constructor(private donationFlowService: DonationFlowService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateDonorComponent>) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      zip: [],
      phoneNumber: [''],
      refSource: ['']
    });
  }

  save() {
    const params = new CreateDonorParams(...this.form.value);
    this.donationFlowService.createDonor(params)
      .subscribe(donor => {
        this.dialogRef.close(donor);
      });
  }
}
