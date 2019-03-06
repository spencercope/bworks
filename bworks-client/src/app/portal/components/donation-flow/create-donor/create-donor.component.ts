import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DonationFlowService } from '../../../services/donation-flow.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateDonorParams } from '../../../../app.api';

@Component({
  selector: 'app-create-donor',
  templateUrl: './create-donor.component.html',
  styleUrls: ['./create-donor.component.scss'],
})
export class CreateDonorComponent implements OnInit {
  @Input() showDialog: boolean;
  @Output() onClose = new EventEmitter<any>();
  form: FormGroup;

  constructor(private donationFlowService: DonationFlowService, private fb: FormBuilder) {}

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
      refSource: [''],
    });
  }
  onHide() {
    this.onClose.emit(null);
  }

  save() {
    const params = new CreateDonorParams(...this.form.value);
    this.donationFlowService.createDonor(params).subscribe(donor => {
      console.log(donor);
      this.onClose.emit(donor);
    });
  }
}
