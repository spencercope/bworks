import { BaseService } from '../shared/base.service';
import { User } from './models/user.model';
import { Model } from 'mongoose';
import { LoginResponseVm } from './models/login-response-vm';
import { LoginParams } from './models/login-params';
import { AuthService } from "../shared/auth/auth.service";
import { CreateUserParams } from "./models/create-user-params";
import { UserVm } from "./models/user-vm";
export declare class UserService extends BaseService<User> {
    private readonly _userModel;
    private readonly authService;
    constructor(_userModel: Model<User>, authService: AuthService);
    register(params: LoginParams): Promise<User>;
    login(params: LoginParams): Promise<LoginResponseVm>;
    createUser(params: CreateUserParams): Promise<User>;
    changePassword(id: string, current: string, newPassword: string, byAdmin?: boolean): Promise<boolean>;
    updateUser(vm: UserVm): Promise<User>;
}
