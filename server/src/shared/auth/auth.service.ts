import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { User, UserRole } from '../../user/models/user.model';

export interface JwtPayload {
  username: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async signIn(username: string, role: UserRole): Promise<string> {
    const user: JwtPayload = { username, role };
    return this.jwtService.signAsync(user);
  }

  async signPayload(payload: { [key: string]: any }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async decodePayload<T>(token: string): Promise<T> {
    return this.jwtService.decode(token, { json: true }) as T;
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.userService.findOne({ username: payload.username });
  }
}
