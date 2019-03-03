import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../services/inventory.service";
import {ItemVm} from "../../../app.api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  dataSource: ItemVm[];
  cols: string[] = ['barcodeId', 'type', 'createdAt', 'updatedAt', 'detail'];

  constructor(private inventoryService: InventoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.inventoryService.getAllItems()
      .subscribe(value => {
        this.dataSource = value;
      });
  }

  detailClick(element: ItemVm) {
    this.router.navigate([element.type.toLowerCase(), element.id], {
      relativeTo: this.route
    });
  }
}
