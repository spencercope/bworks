import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonorsComponent } from './donors.component';
import { DonorsResolve } from './donors-resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/donors',
        component: DonorsComponent,
        // resolve: {
        //   resolvedDonors: DonorsResolve,
        // },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DonorsRoutingModule {}
