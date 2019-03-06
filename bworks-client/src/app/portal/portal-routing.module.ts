import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { DonationFlowComponent } from './components/donation-flow/donation-flow.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { BikeDetailComponent } from './components/inventory/bike-detail/bike-detail.component';
import { PcDetailComponent } from './components/inventory/pc-detail/pc-detail.component';
import { PartDetailComponent } from './components/inventory/part-detail/part-detail.component';
import { MiscDetailComponent } from './components/inventory/misc-detail/misc-detail.component';

const routes: Routes = [
  { path: '', component: PortalComponent },
  { path: 'donation', component: DonationFlowComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/bike/:id', component: BikeDetailComponent },
  { path: 'inventory/pc/:id', component: PcDetailComponent },
  { path: 'inventory/part/:id', component: PartDetailComponent },
  { path: 'inventory/misc/:id', component: MiscDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
