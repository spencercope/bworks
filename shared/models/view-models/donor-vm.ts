import {BaseVm} from "./base-vm";

export class DonorVm extends BaseVm {
    name: string;
    email: string;
    zip: number;
    phoneNumber?: string;
    donations?: any; // TODO: wait for Item
    refSource?: string;
}
