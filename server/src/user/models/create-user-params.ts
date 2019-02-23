import {LoginParams} from "./login-params";
import {UserRole} from "./user.model";

export class CreateUserParams extends LoginParams {
    role: UserRole;
}
