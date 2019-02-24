import {Controller, FileInterceptor, Post, Query, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileReferenceService} from "./file-reference.service";
import {ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiImplicitFile, ApiUseTags} from '@nestjs/swagger';
import {CustomApiOperation} from "../shared/decorators/custom-api-operation.decorator";
import {CustomApiDefaultErrors} from "../shared/decorators/custom-api-errors.decorator";
import {Roles} from "../shared/decorators/roles.decorator";
import {UserRole} from "../user/models/user.model";
import {RolesGuard} from "../shared/guards/roles.guard";
import {AuthGuard} from '@nestjs/passport';

@Controller('api/file-references')
@ApiUseTags('FileReference')
export class FileReferenceController {
    constructor(private readonly fileReferenceService: FileReferenceService) {
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    @Roles(UserRole.Admin, UserRole.Staff)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'image', description: 'Image'})
    @ApiCreatedResponse({type: Boolean})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdateProfilePic'})
    async upload(@UploadedFile() file, @Query('itemId') itemId: string): Promise<boolean> {
        return this.fileReferenceService.uploadImage(file, itemId);
    }
}
