import { BaseService } from "../shared/base.service";
import { Bike, Item, Misc, Part, PC } from "./models/item.model";
import { Model } from "mongoose";
import { BikeVm, ItemVm, MiscVm, PartVm, PCVm } from "./models/item-vm";
import { DonorService } from "../donor/donor.service";
export declare class ItemService extends BaseService<Item> {
    private readonly _itemModel;
    private readonly donorService;
    private _bikeModel;
    private _pcModel;
    private _partModel;
    private _miscModel;
    constructor(_itemModel: Model<Item>, donorService: DonorService);
    createBaseItem(donorId: string, itemVm: ItemVm, isOffsite: boolean, barcodeId: string): Promise<Item>;
    updateBike(id: string, vm: BikeVm): Promise<Bike>;
    updatePc(id: string, vm: PCVm): Promise<PC>;
    updatePart(id: string, vm: PartVm): Promise<Part>;
    updateMisc(id: string, vm: MiscVm): Promise<Misc>;
    getItemById(itemId: string): Promise<Bike | PC>;
    getMiscById(id: string): Promise<Misc>;
    getPartById(id: string): Promise<Part>;
    getPcById(id: string): Promise<PC>;
    getBikeById(id: string): Promise<Bike>;
    getMiscs(): Promise<Misc[]>;
    getParts(): Promise<Part[]>;
    getPCs(): Promise<PC[]>;
    getBikes(): Promise<Bike[]>;
}
