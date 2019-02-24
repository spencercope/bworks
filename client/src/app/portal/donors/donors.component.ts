import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DonorDao } from '../../../services/dao/donor.dao';
import { Donor } from '../../../../../shared/models/donor';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DonorEditDialog } from './form/add-edit-dialog';
import { UserDao } from '../../../services/dao/user.dao';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss'],
})
export class DonorsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'dateAcquired',
    'edit',
  ];
  incomingDonors: Donor[] = this.route.snapshot.data['resolvedDonors'] as Donor[];

  displayDialog: boolean;

  donor: any = {};
  selectedDonor: Donor;
  newDonor: boolean;
  donors: Donor[];
  
  cols: any[];
  
  brands: any[];
  
  colors: any[];
  
  yearFilter: number;

  yearTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private donorDao: DonorDao
  ) {
    console.log(this.donors);
  }

  ngOnInit() {
    this.donorDao.getAllFromServer().subscribe( data=> {
        this.donors = data as Donor[];
    })

    this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'zipCode', header: 'Zip Code' },
        { field: 'refSource', header: 'Ref. Source' }
    ];
  }

  showDialogToAdd() {
    this.newDonor = true;
    this.donor = {};
    this.displayDialog = true;
  }

  save() {
      const donors1 = [...this.donors];
      if (this.newDonor) {
      donors1.push(this.donor);
    } else {
      donors1[this.donors.indexOf(this.selectedDonor)] = this.donor;
    }

    this.donors = donors1;
    this.donor = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.donors.indexOf(this.selectedDonor);
    // next line needs to happen on delete response
    // this.users = this.users.filter((val, i) => i !== index);
    this.donor= null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newDonor = false;
    this.donor = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(u: Donor): any {
    const user = {};
    for (const prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }
}
