import { UserVm } from './user-vm';
import { User } from './user.model';

export class LoginResponseVm {
  accessToken: string;
  user: UserVm;

  constructor(token: string, user: User) {
    this.accessToken = token;
    this.user = new UserVm(user);
  }
}
