import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {DonorService} from "./donor.service";
import {ApiCreatedResponse, ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import {DonorVm} from "./models/donor-vm";
import {CustomApiDefaultErrors} from "../shared/decorators/custom-api-errors.decorator";
import {CustomApiOperation} from "../shared/decorators/custom-api-operation.decorator";
import {CreateDonorParams} from "./models/create-donor-params";
import {Donor} from "../../../shared/models/donor";

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

    @Get()
    @ApiOkResponse({type: DonorVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllDonors'})
    async gelAllDonors(): Promise<DonorVm[]> {
        const donors = await this.donorService.findAll();
        return donors.map(donor => new DonorVm(donor));
    }

    @Get(':id')
    @ApiOkResponse({type: DonorVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetDonorById'})
    async getDonorById(@Param('id') id: string): Promise<DonorVm> {
        const donor = await this.donorService.findById(id);
        return new DonorVm(donor);
    }

    @Get('search')
    @ApiOkResponse({type: DonorVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'SearchDonor'})
    async searchDonor(@Query('email') email: string): Promise<DonorVm> {
        const donor = await this.donorService.findOne({email});
        return new DonorVm(donor);
    }
}
