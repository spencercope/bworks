import {BaseVm} from "./base-vm";

export class FileReferenceVm extends BaseVm {
    publicUrl: string;
    fileName: string;
    itemId: string;
    note?: string;
}
