import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DonorDao } from '../../../services/dao/donor.dao';
import { Donor } from '../../../../../shared/models/donor';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DonorEditDialog } from './form/add-edit-dialog';
import { UserDao } from '../../../services/dao/user.dao';

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
  donors: Donor[] = this.route.snapshot.data['resolvedDonors'] as Donor[];
  dataSource = new MatTableDataSource<Donor>(this.donors);

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDao: UserDao
  ) {
    console.log(this.donors);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    console.log(this.userDao.getCurrentUser());
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(element): void {
    this.openDialog(element);
  }

  addNew(): void {
    this.openDialog({});
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(DonorEditDialog, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(returnInfo => {
      this.addToDataSourceArray(returnInfo);
    });
  }

  private addToDataSourceArray(returnInfo): void {
    if (returnInfo && returnInfo.wasCreated) {
      this.donors.push(returnInfo.donor);
      this.dataSource = new MatTableDataSource<Donor>(this.donors);
    }
  }
}
