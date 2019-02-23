import {BaseVm} from "./base-vm";
import {UserRole} from "../../../server/src/user/models/user.model";

export class UserVm extends BaseVm {
    username: string;
    role: UserRole;
}
