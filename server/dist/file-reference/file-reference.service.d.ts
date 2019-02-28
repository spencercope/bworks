import { BaseService } from "../shared/base.service";
import { FileReference } from "./models/file-reference.model";
import { Model } from "mongoose";
import { CloudinaryFile } from "../shared/cloudinary/cloudinary.module";
import { ItemService } from "../item/item.service";
export declare class FileReferenceService extends BaseService<FileReference> {
    private readonly _fileReferenceModel;
    private readonly itemService;
    constructor(_fileReferenceModel: Model<FileReference>, itemService: ItemService);
    uploadImage(file: CloudinaryFile, itemId: string): Promise<boolean>;
}
