import { UserVm } from './user-vm';
import { User } from './user.model';
export declare class LoginResponseVm {
    accessToken: string;
    user: UserVm;
    constructor(token: string, user: User);
}
