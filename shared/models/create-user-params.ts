import {UserParams} from "./user-params";
import {UserRole} from "../../server/src/user/models/user.model";

export class CreateUserParams extends UserParams {
    role: UserRole;
}
