import {Module} from '@nestjs/common';
import {FileReferenceService} from './file-reference.service';
import {FileReferenceController} from './file-reference.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {fileReferenceSchema} from "./models/file-reference.model";
import {ItemModule} from "../item/item.module";

@Module({
    imports: [MongooseModule.forFeature([{name: 'FileReference', schema: fileReferenceSchema}]), ItemModule],
    providers: [FileReferenceService],
    controllers: [FileReferenceController]
})
export class FileReferenceModule {
}
