import { BaseService } from "../shared/base.service";
import { FileReference } from "./models/file-reference.model";
import { Model } from "mongoose";
import { CloudinaryFile } from "../shared/cloudinary/cloudinary.module";
export declare class FileReferenceService extends BaseService<FileReference> {
    private readonly _fileReferenceModel;
    constructor(_fileReferenceModel: Model<FileReference>);
    uploadImage(file: CloudinaryFile, note: string, itemId: string): Promise<boolean>;
}
