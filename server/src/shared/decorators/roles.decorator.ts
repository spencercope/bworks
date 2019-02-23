import {UserRole} from "../../user/models/user.model";
import {ReflectMetadata} from "@nestjs/common";

export const Roles = (...roles: UserRole[]) => ReflectMetadata('roles', roles);
