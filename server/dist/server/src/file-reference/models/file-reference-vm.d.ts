import { BaseVm } from "../../shared/base-vm";
import { FileReference } from "./file-reference.model";
export declare class FileReferenceVm extends BaseVm<FileReference> {
    constructor(model: FileReference);
    publicUrl: string;
    fileName: string;
    itemId: string;
    note?: string;
    getViewModel(model: FileReference): void;
}
