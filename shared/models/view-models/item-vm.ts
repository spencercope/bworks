import {BaseVm} from "./base-vm";
import {ItemType, Status} from "../../../server/src/item/models/item.model";
import {FileReferenceVm} from "./file-reference-vm";

export class ItemVm extends BaseVm {
    donorId: string;
    type: ItemType;
    notes?: string;
    images?: FileReferenceVm[];
    user?: string;
    status?: Status;
    barcodeId?: number;

    constructor(donorId: string, type: ItemType) {
        super();
        this.type = type;
        this.donorId = donorId;
    }
}
