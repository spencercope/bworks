import { BaseService } from "../shared/base.service";
import { Bike, Item, Misc, Part, PC } from "./models/item.model";
import { Model } from "mongoose";
import { BikeVm, ItemVm, MiscVm, PartVm, PCVm } from "./models/item-vm";
export declare class ItemService extends BaseService<Item> {
    private readonly _itemModel;
    private _bikeModel;
    private _pcModel;
    private _partModel;
    private _miscModel;
    constructor(_itemModel: Model<Item>);
    createBaseItem(donorId: string, itemVm: ItemVm): Promise<Item>;
    updateBike(id: string, vm: BikeVm): Promise<Bike>;
    updatePc(id: string, vm: PCVm): Promise<PC>;
    updatePart(id: string, vm: PartVm): Promise<Part>;
    updateMisc(id: string, vm: MiscVm): Promise<Misc>;
}
