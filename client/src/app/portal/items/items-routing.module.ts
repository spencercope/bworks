import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ItemsResolve } from './items-resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/items',
        component: ItemsComponent,
        // resolve: {
        //   resolvedItems: ItemsResolve,
        // },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
