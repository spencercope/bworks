import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateDonorParams {
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  email: string;
  @ApiModelPropertyOptional()
  zip?: number;
  @ApiModelPropertyOptional()
  phoneNumber?: string;
  @ApiModelPropertyOptional()
  refSource?: string;
}
