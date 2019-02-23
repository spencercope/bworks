import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersResolve } from './users-resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/users',
        component: UsersComponent,
        // resolve: {
        //   resolvedUsers: UsersResolve,
        // },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
