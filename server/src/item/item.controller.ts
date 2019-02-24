import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ItemService} from "./item.service";
import {BikeVm, ItemVm, MiscVm, PartVm, PCVm} from "./models/item-vm";
import {ApiCreatedResponse, ApiImplicitQuery, ApiUseTags, ApiOkResponse} from '@nestjs/swagger';
import {ToBooleanPipe} from "../shared/pipes/to-boolean.pipe";
import {CustomApiDefaultErrors} from "../shared/decorators/custom-api-errors.decorator";
import {CustomApiOperation} from "../shared/decorators/custom-api-operation.decorator";

@Controller('items')
@ApiUseTags('Item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {
    }

    @Post()
    @ApiCreatedResponse({type: ItemVm})
    @ApiImplicitQuery({name: 'isOffsite', required: false})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'CreateBaseItem'})
    async createItem(@Query('donorId') donorId: string,
                     @Query('barcodeId') barcodeId: string,
                     @Query('isOffsite', new ToBooleanPipe()) isOffsite: boolean = false,
                     @Body() itemVm: ItemVm): Promise<ItemVm> {
        const item = await this.itemService.createBaseItem(donorId, itemVm, isOffsite, barcodeId);
        return new ItemVm(item);
    }

    @Put('bike/:id')
    @ApiCreatedResponse({type: BikeVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdateBikeItem'})
    async updateBikeItem(@Param('id') id: string, @Body() vm: BikeVm): Promise<BikeVm> {
        const bike = await this.itemService.updateBike(id, vm);
        return new BikeVm(bike);
    }

    @Put('pc/:id')
    @ApiCreatedResponse({type: PCVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdatePcItem'})
    async updatePcItem(@Param('id') id: string, @Body() vm: PCVm): Promise<PCVm> {
        const pc = await this.itemService.updatePc(id, vm);
        return new PCVm(pc);
    }

    @Put('part/:id')
    @ApiCreatedResponse({type: PartVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdatePartItem'})
    async updatePartItem(@Param('id') id: string, @Body() vm: PartVm): Promise<PartVm> {
        const part = await this.itemService.updatePart(id, vm);
        return new PartVm(part);
    }

    @Put('misc/:id')
    @ApiCreatedResponse({type: MiscVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdateMiscItem'})
    async updateMiscItem(@Param('id') id: string, @Body() vm: MiscVm): Promise<MiscVm> {
        const misc = await this.itemService.updateMisc(id, vm);
        return new MiscVm(misc);
    }

    @Get()
    @ApiOkResponse({type: ItemVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllItems'})
    async getAllItems(): Promise<ItemVm[]> {
        const items = await this.itemService.findAll();
        return items.map(item => new ItemVm(item));
    }

    @Get('bikes')
    @ApiOkResponse({type: BikeVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllBikes'})
    async getBikes(): Promise<BikeVm[]> {
        const bikes = await this.itemService.getBikes();
        return bikes.map(bike => new BikeVm(bike));
    }

    @Get('pcs')
    @ApiOkResponse({type: PCVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllPCs'})
    async getPCs(): Promise<PCVm[]> {
        const pcs = await this.itemService.getPCs();
        return pcs.map(pc => new PCVm(pc));
    }

    @Get('parts')
    @ApiOkResponse({type: PartVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllParts'})
    async getParts(): Promise<PartVm[]> {
        const parts = await this.itemService.getParts();
        return parts.map(part => new PartVm(part));
    }

    @Get('miscs')
    @ApiOkResponse({type: MiscVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllMiscs'})
    async getMiscs(): Promise<MiscVm[]> {
        const miscs = await this.itemService.getMiscs();
        return miscs.map(misc => new MiscVm(misc));
    }

    @Get('bikes/:id')
    @ApiOkResponse({type: BikeVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetBikeById'})
    async getBikeById(@Param('id') id: string): Promise<BikeVm> {
        const bike = await this.itemService.getBikeById(id);
        return new BikeVm(bike);
    }

    @Get('pcs/:id')
    @ApiOkResponse({type: PCVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetPcById'})
    async getPcById(@Param('id') id: string): Promise<PCVm> {
        const pc = await this.itemService.getPcById(id);
        return new PCVm(pc);
    }

    @Get('parts/:id')
    @ApiOkResponse({type: PartVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetPartById'})
    async getPartById(@Param('id') id: string): Promise<PartVm> {
        const part = await this.itemService.getPartById(id);
        return new PartVm(part);
    }

    @Get('miscs/:id')
    @ApiOkResponse({type: MiscVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetMiscById'})
    async getMiscById(@Param('id') id: string): Promise<MiscVm> {
        const misc = await this.itemService.getMiscById(id);
        return new MiscVm(misc);
    }
}
