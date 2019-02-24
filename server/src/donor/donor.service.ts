import {Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base.service";
import {Donor} from "./models/donor.model";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {CreateDonorParams} from './models/create-donor-params';
import {DonorVm} from "./models/donor-vm";

@Injectable()
export class DonorService extends BaseService<Donor> {

    constructor(@InjectModel('Donor') private readonly _donorModel: Model<Donor>) {
        super();
        this._model = _donorModel;
    }

    async createDonor(params: CreateDonorParams): Promise<Donor> {
        const newDonor = this.createModel(params);
        return this.create(newDonor);
    }

    async updateDonor(vm: DonorVm): Promise<Donor> {
        const donor = await this.findById(vm.id);
        donor.email = vm.email;
        donor.firstName = vm.firstName;
        donor.lastName = vm.lastName;
        donor.refSource = vm.refSource;
        donor.phoneNumber = vm.phoneNumber;
        donor.zip = vm.zip;

        return this.update(donor.id, donor);
    }
}
