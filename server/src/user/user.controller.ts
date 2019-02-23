import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {LoginParams} from "./models/login-params";
import {LoginResponseVm} from "./models/login-response-vm";
import {UserVm} from "./models/user-vm";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('login')
    async login(@Body() params: LoginParams): Promise<LoginResponseVm> {
        return this.userService.login(params);
    }

    @Post('register')
    async register(@Body() params: LoginParams): Promise<UserVm> {
        const user = await this.userService.register(params);
        return new UserVm(user);
    }
}
