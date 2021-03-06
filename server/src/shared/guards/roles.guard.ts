import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {User, UserRole} from '../../user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<UserRole[]>('roles', context.getHandler());

        if (!roles || roles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        const hasRole = () => roles.indexOf(user.role) >= 0;

        if (user && user.role && hasRole()) {
            return true;
        }

        throw new UnauthorizedException('You do not have permission (Roles)');
    }
}
