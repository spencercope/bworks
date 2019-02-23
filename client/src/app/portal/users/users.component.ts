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
  inComingUsers: User[] = this.route.snapshot.data['resolvedUsers'] as User[];

  displayDialog: boolean;

  user: any = {};
  selectedUser: User;
  newUser: boolean;
  users: User[];

  cols: any[];

  brands: any[];

  colors: any[];

  yearFilter: number;

  yearTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDao: UserDao
  ) {
    console.log(this.users);
  }


  ngOnInit() {
    this.userDao.getAllFromServer().subscribe( data => {
        this.users = data as User[];
    });

    this.brands = [
      { label: 'All Brands', value: null },
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];

    this.colors = [
      { label: 'White', value: 'White' },
      { label: 'Green', value: 'Green' },
      { label: 'Silver', value: 'Silver' },
      { label: 'Black', value: 'Black' },
      { label: 'Red', value: 'Red' },
      { label: 'Maroon', value: 'Maroon' },
      { label: 'Brown', value: 'Brown' },
      { label: 'Orange', value: 'Orange' },
      { label: 'Blue', value: 'Blue' }
    ];

    this.cols = [
      { field: 'username', header: 'User Name' },
      { field: 'role', header: 'Role' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' }
    ];
  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = {};
    this.displayDialog = true;
  }

  save() {
    const users1 = [...this.users];
    if (this.newUser) {
      users1.push(this.user);
    } else {
      users1[this.users.indexOf(this.selectedUser)] = this.user;
    }

    this.users = users1;
    this.user = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.users.indexOf(this.selectedUser);
    // next line needs to happen on delete response
    // this.users = this.users.filter((val, i) => i !== index);
    this.user = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(u: User): any {
    const user = {};
    for (const prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }
}
