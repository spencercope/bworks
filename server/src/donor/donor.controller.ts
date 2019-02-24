import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {DonorService} from "./donor.service";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import {DonorVm} from "./models/donor-vm";
import {CustomApiDefaultErrors} from "../shared/decorators/custom-api-errors.decorator";
import {CustomApiOperation} from "../shared/decorators/custom-api-operation.decorator";
import {CreateDonorParams} from "./models/create-donor-params";
import {Donor} from "../../../shared/models/donor";
import {Roles} from "../shared/decorators/roles.decorator";
import {UserRole} from "../user/models/user.model";
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from "../shared/guards/roles.guard";

@Controller('donors')
@ApiUseTags('Donor')
@ApiBearerAuth()
export class DonorController {
    constructor(private readonly donorService: DonorService) {
    }

    @Post('create')
    @Roles(UserRole.Admin, UserRole.Staff, UserRole.Volunteer)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiCreatedResponse({type: DonorVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'CreateDonor'})
    async createDonor(@Body() params: CreateDonorParams): Promise<DonorVm> {
        const donor = await this.donorService.createDonor(params);
        return new DonorVm(donor);
    }

    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiOkResponse({type: DonorVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllDonors'})
    async gelAllDonors(): Promise<DonorVm[]> {
        const donors = await this.donorService.findAll();
        return donors.map(donor => new DonorVm(donor));
    }

    @Get(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiOkResponse({type: DonorVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetDonorById'})
    async getDonorById(@Param('id') id: string): Promise<DonorVm> {
        const donor = await this.donorService.findById(id);
        return new DonorVm(donor);
    }

    @Get('search')
    @Roles(UserRole.Admin, UserRole.Staff, UserRole.Volunteer)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiOkResponse({type: DonorVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'SearchDonor'})
    async searchDonor(@Query('email') email: string): Promise<DonorVm> {
        const donor = await this.donorService.findOne({email});
        return new DonorVm(donor);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiCreatedResponse({type: DonorVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdateDonor'})
    async updateDonor(@Body() vm: DonorVm): Promise<DonorVm> {
        const updated = await this.donorService.updateDonor(vm);
        return new DonorVm(updated);
    }
}
