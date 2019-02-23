import {Body, Controller, FileInterceptor, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileReferenceService} from "./file-reference.service";

@Controller('file-references')
export class FileReferenceController {
    constructor(private readonly fileReferenceService: FileReferenceService) {
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    async upload(@UploadedFile() file, @Body('note') note: string, @Query('itemId') itemId: string): Promise<boolean> {
        return this.fileReferenceService.uploadImage(file, note, itemId);
    }
}
