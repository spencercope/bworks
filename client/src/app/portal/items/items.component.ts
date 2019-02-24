import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSort, MatTableDataSource } from "@angular/material";
import { ItemDao } from "../../../services/dao/item.dao";
import { Item } from "../../../../../shared/models/item";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserDao } from "../../../services/dao/user.dao";
import { ItemClient, ItemVm, BikeVm, DonorVm, DonorClient, ItemVmType } from "src/app/app.api";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  displayDialog: boolean;

  item: any = {};

  donor: DonorVm;

  selectedItem: ItemVm;

  newItem: boolean;

  items: ItemVm[];

  cols: any[];

  doneLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDao: UserDao,
    private itemApi: ItemClient,
    private donorApi: DonorClient,
  ) {}

  ngOnInit() {
    this.loadData();
    this.cols = [
      { field: "barcodeId", header: "Barcode" },
      { field: "type", header: "Type" },
      { field: "status", header: "Status" },
      { field: "createdAt", header: "Created At" },
      { field: "updatedAt", header: "Last Updated" }
    ];
  }

  loadData() {
    this.itemApi.getAllItems().subscribe(data => {
      this.items = data;
      this.doneLoading = true;
    });
  }

  showDialogToAdd() {
    this.newItem = true;
    this.item = new ItemVm();
    this.displayDialog = true;
  }

  save() {
    let items = [...this.items];
    if (this.newItem) {
      this.itemApi.createBaseItem(this.item,"1111").subscribe(data => {
        this.loadData();
      });
    } else {
      if (this.item.type === "Bike") {
        this.itemApi.updateBikeItem(this.item, this.item.id).subscribe(dt => {
          this.loadData();
        });
      }
    }
    this.items = items;
    this.item = null;
    this.displayDialog = false;
  }

  delete() {
    //delete call
    this.item = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newItem = false;
    this.item = this.cloneCar(event.data);
    
    // let itemTypeCall;
    // switch (this.item.type) {
    //   case ItemVmType.Bike:
    //     itemTypeCall = this.itemApi.getBikeById(this.item.id);
    // }

    // forkJoin(
    //   itemTypeCall,
    //   this.donorApi.getDonorById(this.item.donorId)
    // ).subscribe(([donor, item]: [DonorVm, any]) => {
    //   this.donor = donor;
    //   this.item = item;
    // })

    this.displayDialog = true;
  }

  cloneCar(c: any): any {
    let item = {};
    for (let prop in c) {
      item[prop] = c[prop];
    }
    return item;
  }
}
