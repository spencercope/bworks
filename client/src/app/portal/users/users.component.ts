import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UserDao } from '../../../services/dao/user.dao';
import { User } from '../../../../../shared/models/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'dateAcquired',
    'edit',
  ];
  users: User[] = this.route.snapshot.data['resolvedUsers'] as User[];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDao: UserDao
  ) {
    console.log(this.users);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    console.log(this.userDao.getCurrentUser());
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private addToDataSourceArray(returnInfo): void {
    if (returnInfo && returnInfo.wasCreated) {
      this.users.push(returnInfo.user);
      this.dataSource = new MatTableDataSource<User>(this.users);
    }
  }
}
