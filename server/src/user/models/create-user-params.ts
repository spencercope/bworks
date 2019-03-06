import { LoginParams } from './login-params';
import { UserRole } from './user.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserParams extends LoginParams {
  @ApiModelProperty({ type: String, enum: UserRole })
  role: UserRole;
}
