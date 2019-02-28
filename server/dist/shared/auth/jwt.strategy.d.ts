import { VerifiedCallback } from 'passport-jwt';
import { AuthService, JwtPayload } from './auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload, done: VerifiedCallback): Promise<any>;
}
export {};
