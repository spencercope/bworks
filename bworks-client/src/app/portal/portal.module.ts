import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './components/portal/portal.component';
import { DonationFlowComponent } from './components/donation-flow/donation-flow.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateDonationComponent } from './components/donation-flow/create-donation/create-donation.component';
import { CreateDonorComponent } from './components/donation-flow/create-donor/create-donor.component';
import { InventoryDetailComponent } from './components/inventory/inventory-detail/inventory-detail.component';
import { BikeDetailComponent } from './components/inventory/bike-detail/bike-detail.component';
import { PcDetailComponent } from './components/inventory/pc-detail/pc-detail.component';
import { MiscDetailComponent } from './components/inventory/misc-detail/misc-detail.component';
import { PartDetailComponent } from './components/inventory/part-detail/part-detail.component';
import { PrimeImportModule } from '../primeng-import.module';

@NgModule({
  declarations: [
    PortalComponent,
    DonationFlowComponent,
    InventoryComponent,
    CreateDonationComponent,
    CreateDonorComponent,
    InventoryDetailComponent,
    BikeDetailComponent,
    PcDetailComponent,
    MiscDetailComponent,
    PartDetailComponent,
  ],
  imports: [CommonModule, PortalRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, PrimeImportModule],
  entryComponents: [CreateDonationComponent, CreateDonorComponent],
})
export class PortalModule {}
