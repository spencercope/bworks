import { BaseVm } from "../../shared/base-vm";
import { User, UserRole } from "./user.model";
export declare class UserVm extends BaseVm<User> {
    username: string;
    role: UserRole;
    constructor(model?: User);
    getViewModel(model: User): void;
}
