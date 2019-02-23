import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ItemDao } from '../../../services/dao/item.dao';
import { Item } from '../../../../../shared/models/item';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
}