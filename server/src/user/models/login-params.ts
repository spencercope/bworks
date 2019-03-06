import { ApiModelProperty } from '@nestjs/swagger';

export class LoginParams {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
}
