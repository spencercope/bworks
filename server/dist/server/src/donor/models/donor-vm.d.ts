import { BaseVm } from "../../shared/base-vm";
import { Donor } from "./donor.model";
import { ItemVm } from "../../item/models/item-vm";
export declare class DonorVm extends BaseVm<Donor> {
    firstName: string;
    lastName: string;
    email: string;
    zip?: number;
    phoneNumber?: string;
    donations?: ItemVm[];
    refSource?: string;
    constructor(model: Donor);
    getViewModel(model: Donor): void;
}
