import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AssetDao } from '../../../services/dao/asset.dao';
import { Asset } from '../../../../../shared/models/asset';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssetEditDialog } from './form/add-edit-dialog';
import { UserDao } from '../../../services/dao/user.dao';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'dateAcquired',
    'edit',
  ];
  assets: Asset[] = this.route.snapshot.data['resolvedAssets'] as Asset[];
  dataSource = new MatTableDataSource<Asset>(this.assets);

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDao: UserDao
  ) {
    console.log(this.assets);
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
    const dialogRef = this.dialog.open(AssetEditDialog, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(returnInfo => {
      this.addToDataSourceArray(returnInfo);
    });
  }

  private addToDataSourceArray(returnInfo): void {
    if (returnInfo && returnInfo.wasCreated) {
      this.assets.push(returnInfo.asset);
      this.dataSource = new MatTableDataSource<Asset>(this.assets);
    }
  }
}
