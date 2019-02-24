import {Injectable, NotFoundException} from '@nestjs/common';
import {BaseService} from "../shared/base.service";
import {FileReference} from "./models/file-reference.model";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {CloudinaryFile} from "../shared/cloudinary/cloudinary.module";
import {ItemService} from "../item/item.service";

@Injectable()
export class FileReferenceService extends BaseService<FileReference> {
    constructor(@InjectModel('FileReference') private readonly _fileReferenceModel: Model<FileReference>,
                private readonly itemService: ItemService) {
        super();
        this._model = _fileReferenceModel;
    }

    async uploadImage(file: CloudinaryFile, itemId: string): Promise<boolean> {
        const item = await this.itemService.findById(itemId);

        if (!item) {
            throw new NotFoundException('Item not found');
        }

        const newFile = this.createModel({
            itemId,
            publicUrl: file.secure_url,
            fileName: file.public_id,
            sizeBytes: file.bytes
        });

        const uploaded = await this.create(newFile);
        item.images.push(uploaded);
        await item.save();

        return true;
    }
}
