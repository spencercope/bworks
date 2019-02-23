import { Injectable } from '@nestjs/common';
import {BaseService} from "../shared/base.service";
import {Bike, Item, ItemType, Misc, Part, PC} from "./models/item.model";
import {Model} from "mongoose";
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class ItemService extends BaseService<Item> {
    private _bikeModel: Model<Bike>;
    private _pcModel: Model<PC>;
    private _partModel: Model<Part>;
    private _miscModel: Model<Misc>;

    constructor(@InjectModel('Item') private readonly _itemModel: Model<Item>) {
        super();
        this._model = _itemModel;
        // this._bikeModel = _itemModel.discriminator<Bike>('Bike', bikeSchema);
        // this._pcModel = _itemModel.discriminator<PC>('PC', pcSchema);
        // this._miscModel = _itemModel.discriminator<Misc>('Misc', miscSchema);
        // this._partModel = _itemModel.discriminator<Part>('Part', partSchema);
    }
}
