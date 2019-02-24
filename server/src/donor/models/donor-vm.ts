import {BaseVm} from "../../shared/base-vm";
import {Donor} from "./donor.model";
import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger";
import {ItemVm} from "../../item/models/item-vm";

export class DonorVm extends BaseVm<Donor> {
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    email: string;
    @ApiModelPropertyOptional()
    zip?: number;
    @ApiModelPropertyOptional()
    phoneNumber?: string;
    @ApiModelPropertyOptional({type: ItemVm, isArray: true})
    donations?: ItemVm[];
    @ApiModelPropertyOptional()
    refSource?: string;

    constructor(model: Donor) {
        super(model);
    }

    getViewModel(model: Donor): void {
        this.name = model.name;
        this.email = model.email;
        this.zip = model.zip;
        this.phoneNumber = model.phoneNumber;
        this.donations = model.donations.map(donation => new ItemVm(donation));
        this.refSource = model.refSource;
    }
}
