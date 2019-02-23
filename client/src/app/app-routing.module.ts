import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: '/login',
          pathMatch: 'full',
          resolve: {},
        },
      ],
      {
        useHash: true,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
