import {Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base.service";
import {FileReference} from "./models/file-reference.model";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {CloudinaryFile} from "../shared/cloudinary/cloudinary.module";

@Injectable()
export class FileReferenceService extends BaseService<FileReference> {
    constructor(@InjectModel('FileReference') private readonly _fileReferenceModel: Model<FileReference>) {
        super();
        this._model = _fileReferenceModel;
    }

    // TODO: waiting for Item module
    async uploadImage(file: CloudinaryFile, note: string, itemId: string): Promise<boolean> {
        return true;
    }
}
