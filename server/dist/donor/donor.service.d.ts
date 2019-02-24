import { BaseService } from "../shared/base.service";
import { Donor } from "./models/donor.model";
import { Model } from "mongoose";
export declare class DonorService extends BaseService<Donor> {
    private readonly _donorModel;
    constructor(_donorModel: Model<Donor>);
}
