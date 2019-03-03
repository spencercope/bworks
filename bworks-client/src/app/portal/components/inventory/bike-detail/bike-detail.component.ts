import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { filter, switchMap } from "rxjs/operators";
import { InventoryService } from "../../../services/inventory.service";
import {
  BikeVm,
  BikeAttribute,
  UserVm,
  BikeAttributeBikeType,
  UserVmRole,
  ItemClient
} from "../../../../app.api";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as _ from "lodash";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-bike-detail",
  templateUrl: "./bike-detail.component.html",
  styleUrls: ["./bike-detail.component.scss"]
})
export class BikeDetailComponent implements OnInit {
  user: UserVm;
  role = UserVmRole;
  isEditable = false;
  bikeData: BikeVm;
  bikeAttForm: FormGroup;

  bikeType = [
    { label: "Not Set", value: "" },
    { label: "Road", value: "road" },
    { label: "Cross", value: "cross" },
    { label: "Mtb", value: "mtb" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Kid", value: "kid" }
  ];

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private authService: AuthService,
    private itemClient: ItemClient
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUser;

    this.route.paramMap
      .pipe(
        filter(data => !!data),
        switchMap((param: ParamMap) => {
          return this.inventoryService.getBikeById(param.get("id"));
        })
      )
      .subscribe((bike: BikeVm) => {
        this.bikeData = bike;
        this.initBikeAttForm();
      });
  }

  initBikeAttForm() {
    this.bikeAttForm = this.fb.group({
      bikeType: [
        this.bikeData.attributes && this.bikeData.attributes.bikeType
          ? this.bikeData.attributes.bikeType
          : ""
      ],
      color: [
        this.bikeData.attributes && this.bikeData.attributes.color
          ? this.bikeData.attributes.color
          : ""
      ],
      frameSize: [
        this.bikeData.attributes && this.bikeData.attributes.frameSize
          ? this.bikeData.attributes.frameSize
          : ""
      ],
      graduatedDate: [
        this.bikeData.attributes && this.bikeData.attributes.graduatedDate
          ? this.bikeData.attributes.graduatedDate
          : ""
      ],
      marketPrice: [
        this.bikeData.attributes && this.bikeData.attributes.marketPrice
          ? this.bikeData.attributes.marketPrice
          : ""
      ],
      serialNumber: [
        this.bikeData.attributes && this.bikeData.attributes.serialNumber
          ? this.bikeData.attributes.serialNumber
          : ""
      ],
      stepOverHeight: [
        this.bikeData.attributes && this.bikeData.attributes.stepOverHeight
          ? this.bikeData.attributes.stepOverHeight
          : ""
      ],
      wheelSize: [
        this.bikeData.attributes && this.bikeData.attributes.wheelSize
          ? this.bikeData.attributes.wheelSize
          : ""
      ],
      notes: [this.bikeData.notes]
    });
    this.bikeAttForm.disable();
  }

  onEditClick() {
    this.bikeAttForm.enable();
    this.isEditable = true;
  }

  onCancelClick() {
    this.bikeAttForm.disable();
    this.isEditable = false;
  }

  save() {
    let { notes, ...temp } = this.bikeAttForm.value;
    this.bikeData.notes = notes;
    this.bikeData.attributes = temp;
    console.log(this.bikeData)

    this.itemClient.updateBikeItem(this.bikeData,this.bikeData.id).subscribe(data=>{
      console.log(data)
    })
  }
}
