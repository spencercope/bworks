import {BaseVm} from "../../shared/base-vm";
import {FileReference} from "./file-reference.model";
import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger";

export class FileReferenceVm extends BaseVm<FileReference> {
    constructor(model: FileReference) {
        super(model);
    }

    @ApiModelProperty()
    publicUrl: string;
    @ApiModelProperty()
    fileName: string;
    @ApiModelProperty()
    itemId: string;
    @ApiModelPropertyOptional()
    note?: string;

    getViewModel(model: FileReference): void {
        this.publicUrl = model.publicUrl;
        this.fileName = model.fileName;
        this.itemId = model.itemId;
        this.note = model.note;
    }
}
