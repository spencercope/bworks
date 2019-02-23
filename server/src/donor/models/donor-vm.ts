import {BaseVm} from "../../shared/base-vm";
import {Donor} from "./donor.model";

export class DonorVm extends BaseVm<Donor> {
    name: string;
    email: string;
    zip: number;
    phoneNumber?: string;
    donations?: any; // TODO: wait for Item
    refSource?: string;

    constructor(model: Donor) {
        super(model);
    }

    getViewModel(model: Donor): void {
        this.name = model.name;
        this.email = model.email;
        this.zip = model.zip;
        this.phoneNumber = model.phoneNumber;
        this.donations = model.donations; // TODO: wait for Item
        this.refSource = model.refSource;
    }
}
