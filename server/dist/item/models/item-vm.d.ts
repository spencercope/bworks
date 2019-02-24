import { BaseVm } from "../../shared/base-vm";
import { Bike, BikeAttribute, Item, ItemType, Misc, Part, PC, PCAttribute, Status } from "./item.model";
import { FileReferenceVm } from "file-reference/models/file-reference-vm";
import { StoryVm, TodoVm } from "../../history/models/history-vm";
export declare class ItemVm extends BaseVm<Item> {
    donorId: string;
    type: ItemType;
    notes: string;
    images?: FileReferenceVm[];
    user?: string;
    status: Status;
    barcodeId: string;
    wikiLinks?: string[];
    constructor(model: Item);
    getViewModel(model: Item): void;
}
export declare class BikeVm extends ItemVm {
    attributes?: BikeAttribute;
    todos?: TodoVm[];
    stories?: StoryVm[];
    constructor(model: Bike);
    getViewModel(model: Bike): void;
}
export declare class PCVm extends ItemVm {
    attributes?: PCAttribute;
    todos?: TodoVm[];
    stories?: StoryVm[];
    constructor(model: PC);
    getViewModel(model: PC): void;
}
export declare class PartVm extends ItemVm {
    name?: string;
    description?: string;
    constructor(model: Part);
    getViewModel(model: Part): void;
}
export declare class MiscVm extends ItemVm {
    name?: string;
    description?: string;
    constructor(model: Misc);
    getViewModel(model: Misc): void;
}
