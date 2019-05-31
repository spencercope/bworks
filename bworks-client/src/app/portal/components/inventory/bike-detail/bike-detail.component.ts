import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { InventoryService } from '../../../services/inventory.service';
import {
  BikeVm,
  BikeAttribute,
  UserVm,
  UserVmRole,
  FileReferenceClient,
  DonorClient,
  DonorVm,
} from '../../../../app.api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.scss'],
})
export class BikeDetailComponent implements OnInit {
  user: UserVm;
  role = UserVmRole;
  isEditable = false;
  bikeData: BikeVm;
  bikeAttForm: FormGroup;

  donorForm: FormGroup;
  donorData: DonorVm;
  isEditableDonor= false;

  file: any;

  bikeType = [
    { label: 'Not Set', value: '' },
    { label: 'Road', value: 'road' },
    { label: 'Cross', value: 'cross' },
    { label: 'Mtb', value: 'mtb' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Kid', value: 'kid' },
  ];

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private authService: AuthService,
    private fileService: FileReferenceClient,
    private donorService: DonorClient,
  ) { }

  ngOnInit() {
    this.authService.checkLocalLogin();
    this.user = this.authService.currentUser;

    this.route.paramMap
      .pipe(
        filter(data => !!data),
        switchMap((param: ParamMap) => {
          return this.inventoryService.getBikeById(param.get('id'));
        }),
        switchMap((bike: BikeVm) => {
          this.bikeData = bike;
          return this.donorService.getDonorById(bike.donorId);
        }),
      )
      .subscribe((donor: DonorVm) => {
        this.donorData = donor;
        this.initBikeAttForm();
        this.initDonorForm();
      });

  }

  initBikeAttForm() {
    this.bikeAttForm = this.fb.group({
      bikeType: [
        this.bikeData.attributes && this.bikeData.attributes.bikeType ? this.bikeData.attributes.bikeType : '',
      ],
      color: [this.bikeData.attributes && this.bikeData.attributes.color ? this.bikeData.attributes.color : ''],
      frameSize: [
        this.bikeData.attributes && this.bikeData.attributes.frameSize ? this.bikeData.attributes.frameSize : '',
      ],
      graduatedDate: [
        this.bikeData.attributes && this.bikeData.attributes.graduatedDate
          ? this.bikeData.attributes.graduatedDate
          : '',
      ],
      marketPrice: [
        this.bikeData.attributes && this.bikeData.attributes.marketPrice ? this.bikeData.attributes.marketPrice : '',
        [Validators.required, Validators.minLength(4)]
      ],
      serialNumber: [
        this.bikeData.attributes && this.bikeData.attributes.serialNumber ? this.bikeData.attributes.serialNumber : '',
      ],
      stepOverHeight: [
        this.bikeData.attributes && this.bikeData.attributes.stepOverHeight
          ? this.bikeData.attributes.stepOverHeight
          : '',
      ],
      wheelSize: [
        this.bikeData.attributes && this.bikeData.attributes.wheelSize ? this.bikeData.attributes.wheelSize : '',
      ],
      notes: [this.bikeData.notes],
    });
    //this.bikeAttForm.disable();
    console.log(this.bikeAttForm.controls.marketPrice)
  }

  checkValue(){
    console.log(this.bikeAttForm.controls.marketPrice)

  }

  initDonorForm() {
    this.donorForm = this.fb.group({
      firstName: [
        this.donorData.firstName ? this.donorData.firstName : '',
      ],
      lastName: [
        this.donorData.lastName ? this.donorData.lastName : '',
      ],
      email: [
        this.donorData.email ? this.donorData.email : '',
      ],
      zip: [
        this.donorData.zip ? this.donorData.zip : '',
      ],
      phoneNumber: [
        this.donorData.phoneNumber ? this.donorData.phoneNumber : '',
      ],
      refSource: [
        this.donorData.refSource ? this.donorData.refSource : '',
      ],

    });
    this.donorForm.disable();
  }

  onEditClick() {
    this.bikeAttForm.enable();
    this.isEditable = true;
  }

  onEditClickDonor(){
    this.donorForm.enable();
    this.isEditableDonor = true;
  }

  onCancelClick() {
    // this.bikeAttForm.disable();
    this.initBikeAttForm();
    this.isEditable = false;
  }
  onCancelClickDonor(){
    this.donorForm.disable();
    this.initDonorForm();
    this.isEditableDonor = false;
  }

  save() {
    const { notes, ...attributes } = this.bikeAttForm.value;
    this.bikeData.notes = notes;
    this.bikeData.attributes = BikeAttribute.fromJS(attributes);

    this.inventoryService.updateBikeItem(this.bikeData.id, this.bikeData).subscribe(data => {
      this.bikeData = data;
      this.isEditable = false;
      this.bikeAttForm.disable();
      this.initBikeAttForm();
    });
  }

  saveDonor(){
    this.donorData = this.donorForm.value;
    this.donorData.id = this.bikeData.donorId;
    this.donorService.updateDonor(this.donorData).subscribe(data=>{
      this.donorData = data;
      this.isEditableDonor = false;
      this.donorForm.disable();
      this.initDonorForm();
    })
  }

  onUpload(event) {
    let file = event.files[0];
    this.fileService.updateProfilePic(this.bikeData.id, file).subscribe(data => {
      console.log(data);
    });
    console.log(file);
  }
}
