import {BaseVm} from "../../shared/base-vm";
import {FileReference} from "./file-reference.model";

export class FileReferenceVm extends BaseVm<FileReference> {
    constructor(model: FileReference) {
        super(model);
    }

    publicUrl: string;
    fileName: string;
    itemId: string;
    note?: string;

    getViewModel(model: FileReference): void {
        this.publicUrl = model.publicUrl;
        this.fileName = model.fileName;
        this.itemId = model.itemId;
        this.note = model.note;
    }
}
