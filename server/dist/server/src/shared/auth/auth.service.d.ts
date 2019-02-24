import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { User, UserRole } from '../../user/models/user.model';
export interface JwtPayload {
    username: string;
    role: UserRole;
}
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    signIn(username: string, role: UserRole): Promise<string>;
    signPayload(payload: {
        [key: string]: any;
    }): Promise<string>;
    decodePayload<T>(token: string): Promise<T>;
    validateUser(payload: JwtPayload): Promise<User>;
}
