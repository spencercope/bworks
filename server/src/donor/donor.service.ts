import {Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base.service";
import {Donor} from "./models/donor.model";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";

@Injectable()
export class DonorService extends BaseService<Donor> {
    constructor(@InjectModel('Donor') private readonly _donorModel: Model<Donor>) {
        super();
        this._model = _donorModel;
    }
}
