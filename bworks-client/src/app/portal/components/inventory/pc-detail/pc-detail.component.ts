import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {InventoryService} from "../../../services/inventory.service";
import {filter, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-pc-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss']
})
export class PcDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private inventoryService: InventoryService) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        filter(data => !!data),
        switchMap((param: ParamMap) => {
          return this.inventoryService.getPcById(param.get('id'));
        })
      );
  }

}
