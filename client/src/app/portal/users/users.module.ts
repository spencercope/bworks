import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UserDao } from '../../../services/dao/user.dao';
import { UsersResolve } from './users-resolve';
import { UsersComponent } from './users.component';
import { MaterialModule } from '../../../shared-client/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule,
  ],
  declarations: [UsersComponent],
  exports: [UsersComponent],
  providers: [UserDao, UsersResolve],
})
export class UsersModule {}
