import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {LoginParams} from "./models/login-params";
import {LoginResponseVm} from "./models/login-response-vm";
import {UserVm} from "./models/user-vm";
import {Roles} from "../shared/decorators/roles.decorator";
import {User, UserRole} from "./models/user.model";
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from "../shared/guards/roles.guard";
import {CustomAuthUser} from "../shared/decorators/custom-auth-user.decorator";
import {CreateUserParams} from "./models/create-user-params";
import {ChangePasswordParams} from "./models/change-password-params";

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

    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllUsers(@CustomAuthUser() currentUser: User): Promise<UserVm[]> {
        const users = await this.userService.findAll();
        return users.map(user => new UserVm(user));
    }

    @Get('me')
    @UseGuards(AuthGuard())
    async me(@CustomAuthUser() currentUser: User): Promise<UserVm> {
        return new UserVm(currentUser);
    }

    @Post('create-user')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createUser(@Body() params: CreateUserParams): Promise<UserVm> {
        const user = await this.userService.createUser(params);
        return new UserVm(user);
    }

    @Post('change-password/:id')
    async changePassword(@Param('id') id: string, @Body() params: ChangePasswordParams): Promise<boolean> {
        return this.userService.changePassword(id, params.current, params.newPassword);
    }

    @Post('change-password-admin/:id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async changePasswordByAdmin(@Param('id') id: string, @Body('newPassword') newPassword: string): Promise<boolean> {
        return this.userService.changePassword(id, '', newPassword, true);
    }

    @Put('update')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateUser(@Body() vm: UserVm): Promise<UserVm> {
        const user = await this.userService.updateUser(vm);
        return new UserVm(user);
    }

    @Delete('delete/:id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        const user = await this.userService.findById(id);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        await this.userService.delete(id);
        return true;
    }
}
