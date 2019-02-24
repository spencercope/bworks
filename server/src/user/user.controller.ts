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
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import {CustomApiDefaultErrors} from "../shared/decorators/custom-api-errors.decorator";
import {CustomApiOperation} from "../shared/decorators/custom-api-operation.decorator";

@Controller('users')
@ApiUseTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('login')
    @ApiCreatedResponse({type: LoginResponseVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'Login'})
    async login(@Body() params: LoginParams): Promise<LoginResponseVm> {
        return this.userService.login(params);
    }

    @Post('register')
    @ApiCreatedResponse({type: UserVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'Register'})
    async register(@Body() params: LoginParams): Promise<UserVm> {
        const user = await this.userService.register(params);
        return new UserVm(user);
    }

    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: UserVm, isArray: true})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'GetAllUsers'})
    async getAllUsers(@CustomAuthUser() currentUser: User): Promise<UserVm[]> {
        const users = await this.userService.findAll();
        return users.map(user => new UserVm(user));
    }

    @Get('me')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @ApiOkResponse({type: UserVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'Me'})
    async me(@CustomAuthUser() currentUser: User): Promise<UserVm> {
        return new UserVm(currentUser);
    }

    @Post('create-user')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({type: UserVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'CreateUser'})
    async createUser(@Body() params: CreateUserParams): Promise<UserVm> {
        const user = await this.userService.createUser(params);
        return new UserVm(user);
    }

    @Post('change-password/:id')
    @ApiCreatedResponse({type: Boolean})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'ChangePassword'})
    async changePassword(@Param('id') id: string, @Body() params: ChangePasswordParams): Promise<boolean> {
        return this.userService.changePassword(id, params.current, params.newPassword);
    }

    @Post('change-password-admin/:id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({type: Boolean})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'ChangePasswordByAdmin'})
    async changePasswordByAdmin(@Param('id') id: string, @Body('newPassword') newPassword: string): Promise<boolean> {
        return this.userService.changePassword(id, '', newPassword, true);
    }

    @Put('update')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiCreatedResponse({type: UserVm})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'UpdateUser'})
    async updateUser(@Body() vm: UserVm): Promise<UserVm> {
        const user = await this.userService.updateUser(vm);
        return new UserVm(user);
    }

    @Delete('delete/:id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiCreatedResponse({type: Boolean})
    @CustomApiDefaultErrors()
    @CustomApiOperation({title: 'DeleteUser'})
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        const user = await this.userService.findById(id);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        await this.userService.delete(id);
        return true;
    }
}
