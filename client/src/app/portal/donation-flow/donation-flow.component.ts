import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDao } from '../../../services/dao/user.dao';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {BarcodeHelperService} from '../../../services/barcode-helper.service';
import {DonorClient, ItemClient} from '../../app.api';
import {ItemVm} from '../../../../../server/src/item/models/item-vm';

@Component({
  selector: 'app-donation-flow',
  templateUrl: './donation-flow.component.html',
  styleUrls: ['./donation-flow.component.scss'],
})
export class DonationFlowComponent implements OnInit {

  donorForm: FormGroup;
  FirstName = '';
  LastName = '';
  Email = '';

  bicycleForm: FormGroup;
  breakpoint: number;
  itemBreakpoint: number;
  searchBreakpoint: number;
  barcodeText = '1_123467';
  items: any[];
  options: any;
  showNextPart = false;
  needToCreateDonor: false;
  searchEmail: string;
  newEmail: string;
  donor: any;

  public panelOpenState = false;

  constructor(
    private fb: FormBuilder,
    private printHelper: BarcodeHelperService,
    private itemApi: ItemClient,
    private donorApi: DonorClient) {

    this.items = [{
      type: '',
      notes: '',
    }];

    this.options = {
      PC: 'pc',
      BIKE: 'bike',
      PC_PART: 'pc part',
      BIKE_PART: 'bike part',
      misc: 'misc',
    };

    // To initialize FormGroup
    this.donorForm = fb.group({
      'firstName' : [ null, Validators.required],
      'lastName' : [ null, Validators.required],
      'zip' : [null],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'phoneNumber': [null],
      'refSource': [null]
    });

    // this.bicycleForm = fb.group({
    //   'firstName' : [null, Validators.required],
    //   'lastName' : [null, Validators.required],
    //   'businessName' : [null],
    //   'email': [null, Validators.compose([Validators.required, Validators.email])],
    //   'phoneNumber': [null],
    //   'refSource': [null]
    // });

  }

  addItem() {
    console.log(this.items);
    this.items.push({
      type: '',
      desc: '',
    });
  }

  deleteItem() {
    this.items.splice(this.items.length - 1, 0);
  }

  searchForEmail() {
    this.donorApi.getAllDonors().subscribe( data => {
      console.log(data);
      this.donor = data.filter(d => d.email === this.searchEmail );
      this.donor = this.donor[0];
      if (this.donor) {
        console.log(this.donor);
        this.donorForm.controls['firstName'].setValue(this.donor.firstName);
        this.donorForm.controls['lastName'].setValue(this.donor.lastName);
        this.donorForm.controls['email'].setValue(this.donor.email);
        this.donorForm.controls['firstName'].setValue(this.donor.firstName);
        this.donorForm.controls['zip'].setValue(this.donor.zip);
        console.log(this.donorForm);
        this.donorForm.disable();
        this.showNextPart = true;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adjustBreakpoints();
  }

  private adjustBreakpoints(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.itemBreakpoint = (window.innerWidth <= 600) ? 1 : 4;
    this.searchBreakpoint = (window.innerWidth <= 600) ? 1 : 3;
  }

  // Executed When Form Is Submitted
  onFormSubmit(form) {
    console.log(form);
    this.submitDonor(form);
  }

  private submitDonor(form) {
    this.donorApi.createDonor(form.value).subscribe( newlyCreatedDonror => {
      console.log(newlyCreatedDonror);
      this.showNextPart = true;
      form.disable();
      this.donor = newlyCreatedDonror;
    });
  }

  ngOnInit() {
    this.adjustBreakpoints();
  }

  saveAndGenerate(index) {
    // save and create barcode
    // then enable the print
    console.log(this.items[index]);
    this.itemApi.createBaseItem(
      this.items[index],
      this.donor.id
    ).subscribe(item => {
      this.items[index] = item;
      console.log(this.items[index]);
    });
  }

  finish() {
    this.rou
  }

  printBarcode(text) {
    this.printHelper.printBarcodeText(text);
  }
}
