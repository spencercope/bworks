import { BaseService } from "../shared/base.service";
import { Donor } from "./models/donor.model";
import { Model } from "mongoose";
import { CreateDonorParams } from './models/create-donor-params';
import { DonorVm } from "./models/donor-vm";
export declare class DonorService extends BaseService<Donor> {
    private readonly _donorModel;
    constructor(_donorModel: Model<Donor>);
    createDonor(params: CreateDonorParams): Promise<Donor>;
    updateDonor(vm: DonorVm): Promise<Donor>;
}
