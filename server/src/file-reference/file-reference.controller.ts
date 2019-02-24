import {Body, Controller, FileInterceptor, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileReferenceService} from "./file-reference.service";
import {ApiConsumes, ApiCreatedResponse, ApiImplicitFile, ApiUseTags} from '@nestjs/swagger';
import {CustomApiOperation} from "../shared/decorators/custom-api-operation.decorator";
import {CustomApiDefaultErrors} from "../shared/decorators/custom-api-errors.decorator";

@Controller('file-references')
@ApiUseTags('FileReference')
export class FileReferenceController {
    constructor(private readonly fileReferenceService: FileReferenceService) {
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'image', description: 'Image'})
    @ApiCreatedResponse({type: Boolean})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdateProfilePic'})
    async upload(@UploadedFile() file, @Query('itemId') itemId: string): Promise<boolean> {
        return this.fileReferenceService.uploadImage(file, itemId);
    }
}
