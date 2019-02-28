import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {filter, switchMap} from "rxjs/operators";
import {InventoryService} from "../../../services/inventory.service";
import {BikeVm} from "../../../../app.api";

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.scss']
})
export class BikeDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private inventoryService: InventoryService) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        filter(data => !!data),
        switchMap((param: ParamMap) => {
          return this.inventoryService.getBikeById(param.get('id'));
        })
      ).subscribe((bike: BikeVm) => {
      console.log(bike);
    });
  }

}
