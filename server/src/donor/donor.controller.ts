import {Body, Controller, Post} from '@nestjs/common';
import {DonorService} from "./donor.service";
import {ApiCreatedResponse, ApiUseTags} from '@nestjs/swagger';
import {DonorVm} from "./models/donor-vm";
import {CustomApiDefaultErrors} from "../shared/decorators/custom-api-errors.decorator";
import {CustomApiOperation} from "../shared/decorators/custom-api-operation.decorator";
import {CreateDonorParams} from "./models/create-donor-params";

@Controller('donors')
@ApiUseTags('Donor')
export class DonorController {
    constructor(private readonly donorService: DonorService) {
    }

    @Post('create')
    @ApiCreatedResponse({type: DonorVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'CreateDonor'})
    async createDonor(@Body() params: CreateDonorParams): Promise<DonorVm> {
        const donor = await this.donorService.createDonor(params);
        return new DonorVm(donor);
    }
}
