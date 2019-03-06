import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { filter, switchMap } from 'rxjs/operators';
import { MiscVm } from '../../../../app.api';

@Component({
  selector: 'app-misc-detail',
  templateUrl: './misc-detail.component.html',
  styleUrls: ['./misc-detail.component.scss'],
})
export class MiscDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        filter(data => !!data),
        switchMap((param: ParamMap) => {
          return this.inventoryService.getMiscById(param.get('id'));
        }),
      )
      .subscribe((misc: MiscVm) => {
        console.log(misc);
      });
  }
}
