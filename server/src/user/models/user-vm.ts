import {BaseVm} from "../../shared/base-vm";
import {User, UserRole} from "./user.model";

export class UserVm extends BaseVm<User> {
    username: string;
    role: UserRole;

    constructor(model: User = null) {
        super(model);
    }

    getViewModel(model: User): void {
        this.username = model.username;
        this.role = model.role;
    }
}
