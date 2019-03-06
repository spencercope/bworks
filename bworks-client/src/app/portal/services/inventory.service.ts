import { Injectable } from '@angular/core';
import { BikeVm, ItemClient, ItemVm, MiscVm, PartVm, PCVm } from '../../app.api';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private itemClient: ItemClient) {}

  getAllItems(): Observable<ItemVm[]> {
    return this.itemClient.getAllItems();
  }

  getItemById(barcodeId: string): Observable<ItemVm> {
    return this.itemClient.getItemByBarcodeId(barcodeId);
  }

  getBikeById(id: string): Observable<BikeVm> {
    return this.itemClient.getBikeById(id);
  }

  getPcById(id: string): Observable<PCVm> {
    return this.itemClient.getPcById(id);
  }

  getPartById(id: string): Observable<PartVm> {
    return this.itemClient.getPartById(id);
  }

  getMiscById(id: string): Observable<MiscVm> {
    return this.itemClient.getMiscById(id);
  }

  updateBikeItem(id: string, vm: BikeVm): Observable<BikeVm> {
    return this.itemClient.updateBikeItem(vm, id);
  }
}
