import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {InventoryService} from "../../../services/inventory.service";
import {filter, switchMap} from "rxjs/operators";
import {ItemVm, ItemVmType} from "../../../../app.api";

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private inventoryService: InventoryService) {
  }

  ngOnInit() {

  }

}
