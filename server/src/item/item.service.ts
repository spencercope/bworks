import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {BaseService} from "../shared/base.service";
import {Bike, bikeSchema, Item, ItemType, Misc, miscAndPartSchema, Part, PC, pcSchema} from "./models/item.model";
import {Model} from "mongoose";
import {InjectModel} from '@nestjs/mongoose';
import {BikeVm, ItemVm, MiscVm, PartVm, PCVm} from "./models/item-vm";
import {DonorService} from "../donor/donor.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class ItemService extends BaseService<Item> {
    private _bikeModel: Model<Bike>;
    private _pcModel: Model<PC>;
    private _partModel: Model<Part>;
    private _miscModel: Model<Misc>;

    constructor(@InjectModel('Item') private readonly _itemModel: Model<Item>,
                private readonly donorService: DonorService) {
        super();
        this._model = _itemModel;
        this._bikeModel = _itemModel.discriminator<Bike>('Bike', bikeSchema);
        this._pcModel = _itemModel.discriminator<PC>('PC', pcSchema);
        this._miscModel = _itemModel.discriminator<Misc>('Misc', miscAndPartSchema);
        this._partModel = _itemModel.discriminator<Part>('Part', miscAndPartSchema);
    }

    async createBaseItem(donorId: string, itemVm: ItemVm, isOffsite: boolean, barcodeId: string): Promise<Item> {
        const donor = await this.donorService.findById(donorId);

        if (!donor) {
            throw new NotFoundException('Donor not found');
        }

        const newItem = this.createModel({donorId: donor.id, type: itemVm.type, notes: itemVm.notes});
        const count = await this.counts();

        if (isOffsite) {
            if (!barcodeId) {
                throw new BadRequestException('Barcode is required for Offsite item');
            }

            newItem.barcodeId = barcodeId;
        } else {
            newItem.barcodeId = (count + 1).toString();
        }
        const item = await this.create(newItem);

        donor.donations.push(item);
        await donor.save();

        return item;
    }

    async updateBike(id: string, vm: BikeVm): Promise<Bike> {
        const bike = await this._bikeModel.findById(id).exec();

        if (!bike) {
            throw new NotFoundException('Bike not found');
        }

        bike.attributes = vm.attributes;
        bike.status = vm.status;
        bike.user = vm.user;
        bike.notes = vm.notes;
        bike.wikiLinks = vm.wikiLinks;

        return this._bikeModel.findByIdAndUpdate(bike.id, bike, {new: true})
            .populate('images')
            .populate('todos')
            .populate('stories');
    }

    async updatePc(id: string, vm: PCVm): Promise<PC> {
        const pc = await this._pcModel.findById(id);

        if (!pc) {
            throw new NotFoundException('PC not found');
        }

        pc.attributes = vm.attributes;
        pc.status = vm.status;
        pc.user = vm.user;
        pc.notes = vm.notes;
        pc.wikiLinks = vm.wikiLinks;

        return this._pcModel.findByIdAndUpdate(pc.id, pc, {new: true})
            .populate('images')
            .populate('todos')
            .populate('stories');
        ;
    }

    async updatePart(id: string, vm: PartVm): Promise<Part> {
        const part = await this._partModel.findById(id);

        if (!part) {
            throw new NotFoundException('Part not found');
        }

        part.name = vm.name;
        part.description = vm.description;
        part.wikiLinks = vm.wikiLinks;

        return this._partModel.findByIdAndUpdate(part.id, part, {new: true});
    }

    async updateMisc(id: string, vm: MiscVm): Promise<Misc> {
        const misc = await this._miscModel.findById(id);

        if (!misc) {
            throw new NotFoundException('Misc not found');
        }

        misc.name = vm.name;
        misc.description = vm.description;
        misc.wikiLinks = vm.wikiLinks;

        return this._miscModel.findByIdAndUpdate(misc.id, misc, {new: true});
    }

    async getItemById(itemId: string) {
        const item = await this.findById(itemId);

        switch (item.type) {
            case ItemType.Bike:
                return await this.getBikeById(itemId);
            case ItemType.PC:
                return await this.getPcById(itemId);
            case ItemType.Part:
            case ItemType.Misc:
                return null;
        }
    }

    async getMiscById(id: string): Promise<Misc> {
        return this._miscModel.findById(id);
    }

    async getPartById(id: string): Promise<Part> {
        return this._partModel.findById(id);
    }

    async getPcById(id: string): Promise<PC> {
        return this._pcModel.findById(id)
            .populate('images')
            .populate('todos')
            .populate('stories');
    }

    async getBikeById(id: string): Promise<Bike> {
        return this._bikeModel.findById(id)
            .populate('images')
            .populate('todos')
            .populate('stories');
    }

    async getMiscs(): Promise<Misc[]> {
        return this._miscModel.find();
    }

    async getParts(): Promise<Part[]> {
        return this._partModel.find();
    }

    async getPCs(): Promise<PC[]> {
        return this._pcModel.find()
            .populate('images')
            .populate('todos')
            .populate('stories');
    }

    async getBikes(): Promise<Bike[]> {
        return this._bikeModel.find()
            .populate('images')
            .populate('todos')
            .populate('stories');
    }

}
