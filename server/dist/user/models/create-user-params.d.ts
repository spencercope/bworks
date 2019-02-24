import { LoginParams } from "./login-params";
import { UserRole } from "./user.model";
export declare class CreateUserParams extends LoginParams {
    role: UserRole;
}
