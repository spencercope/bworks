import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ItemDao } from '../../../services/dao/item.dao';
import { Item } from '../../../../../shared/models/item';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemEditDialog } from './form/add-edit-dialog';
import { UserDao } from '../../../services/dao/user.dao';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'dateAcquired',
    'edit',
  ];
  items: Item[] = this.route.snapshot.data['resolvedItems'] as Item[];
  dataSource = new MatTableDataSource<Item>(this.items);

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDao: UserDao
  ) {
    console.log(this.items);
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
    const dialogRef = this.dialog.open(ItemEditDialog, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(returnInfo => {
      this.addToDataSourceArray(returnInfo);
    });
  }

  private addToDataSourceArray(returnInfo): void {
    if (returnInfo && returnInfo.wasCreated) {
      this.items.push(returnInfo.item);
      this.dataSource = new MatTableDataSource<Item>(this.items);
    }
  }
}
