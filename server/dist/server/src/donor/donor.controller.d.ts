import { DonorService } from "./donor.service";
import { DonorVm } from "./models/donor-vm";
import { CreateDonorParams } from "./models/create-donor-params";
export declare class DonorController {
    private readonly donorService;
    constructor(donorService: DonorService);
    createDonor(params: CreateDonorParams): Promise<DonorVm>;
    gelAllDonors(): Promise<DonorVm[]>;
    getDonorById(id: string): Promise<DonorVm>;
    searchDonor(email: string): Promise<DonorVm>;
    updateDonor(vm: DonorVm): Promise<DonorVm>;
}
