import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger";

export class ChangePasswordParams {
    @ApiModelPropertyOptional()
    current?: string;
    @ApiModelProperty()
    newPassword: string;
}
