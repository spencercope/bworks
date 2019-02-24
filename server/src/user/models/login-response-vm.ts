import {UserVm} from './user-vm';
import {User} from './user.model';
import {ApiModelProperty} from '@nestjs/swagger';

export class LoginResponseVm {
    @ApiModelProperty()
    accessToken: string;
    @ApiModelProperty({type: UserVm})
    user: UserVm;

    constructor(token: string, user: User) {
        this.accessToken = token;
        this.user = new UserVm(user);
    }
}
