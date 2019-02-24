import { UserService } from "./user.service";
import { LoginParams } from "./models/login-params";
import { LoginResponseVm } from "./models/login-response-vm";
import { UserVm } from "./models/user-vm";
import { User } from "./models/user.model";
import { CreateUserParams } from "./models/create-user-params";
import { ChangePasswordParams } from "./models/change-password-params";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(params: LoginParams): Promise<LoginResponseVm>;
    register(params: LoginParams): Promise<UserVm>;
    getAllUsers(currentUser: User): Promise<UserVm[]>;
    me(currentUser: User): Promise<UserVm>;
    createUser(params: CreateUserParams): Promise<UserVm>;
    changePassword(id: string, params: ChangePasswordParams): Promise<boolean>;
    changePasswordByAdmin(id: string, newPassword: string): Promise<boolean>;
    updateUser(vm: UserVm): Promise<UserVm>;
    deleteUser(id: string): Promise<boolean>;
}
