import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDao } from '../../../services/dao/user.dao';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-donation-flow',
  templateUrl: './donation-flow.component.html',
  styleUrls: ['./donation-flow.component.scss'],
})
export class DonationFlowComponent implements OnInit {

  donationForm: FormGroup;
  FirstName = '';
  LastName = '';
  Address = '';
  DOB: Date = null;
  Gender = '';
  Blog = '';
  Email = '';
  IsAccepted = 0;

  public panelOpenState = false;

  constructor(private fb: FormBuilder) {

    // To initialize FormGroup
    this.donationForm = fb.group({
      'FirstName' : [null, Validators.required],
      'LastName' : [null, Validators.required],
      'Address' : [null, Validators.required],
      'DOB' : [null, Validators.required],
      'Gender': [null, Validators.required],
      'Blog': [null, Validators.required],
      'Email': [null, Validators.compose([Validators.required, Validators.email])],
      'IsAccepted': [null]
    });

  }

  // On Change event of Toggle Button
  onChange(event: any) {
    if (event.checked === true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
  }
  ngOnInit() {
    // console.log(this.userDao.getCurrentUser());
  }

}
