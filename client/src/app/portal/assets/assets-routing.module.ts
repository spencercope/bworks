import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetsComponent } from './assets.component';
import { AssetsResolve } from './assets-resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/assets',
        component: AssetsComponent,
        // resolve: {
        //   resolvedAssets: AssetsResolve,
        // },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AssetsRoutingModule {}
