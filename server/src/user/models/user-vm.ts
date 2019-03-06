import { BaseVm } from '../../shared/base-vm';
import { User, UserRole } from './user.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserVm extends BaseVm<User> {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty({ type: String, enum: UserRole })
  role: UserRole;

  constructor(model: User = null) {
    super(model);
  }

  getViewModel(model: User): void {
    this.username = model.username;
    this.role = model.role;
  }
}
