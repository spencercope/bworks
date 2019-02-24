import { BaseVm } from "../../shared/base-vm";
import { Donor } from "./donor.model";
export declare class DonorVm extends BaseVm<Donor> {
    name: string;
    email: string;
    zip: number;
    phoneNumber?: string;
    donations?: any;
    refSource?: string;
    constructor(model: Donor);
    getViewModel(model: Donor): void;
}
