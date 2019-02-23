import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonationFlowComponent } from './donation-flow.component';
import { DonationFlowResolve } from './donation-flow-resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/donation-flow',
        component: DonationFlowComponent,
        // resolve: {
        //   resolvedDonationFlow: DonationFlowResolve,
        // },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DonationFlowRoutingModule {}
