import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {BaseService} from '../shared/base.service';
import {User} from './models/user.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LoginResponseVm} from './models/login-response-vm';
import {LoginParams} from './models/login-params';
import {AuthService} from "../shared/auth/auth.service";
import {compare} from "bcrypt";
import {CreateUserParams} from "./models/create-user-params";
import {UserVm} from "./models/user-vm";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectModel('User') private readonly _userModel: Model<User>,
                @Inject(forwardRef(() => AuthService))
                private readonly authService: AuthService,) {
        super();
        this._model = _userModel;
    }

    async register(params: LoginParams): Promise<User> {
        const existed = await this.findOne({username: params.username});

        if (existed) {
            throw new BadRequestException('Username existed');
        }

        const newUser = this.createModel(params);
        return await this.create(newUser);
    }

    async login(params: LoginParams): Promise<LoginResponseVm> {
        const {username, password} = params;

        const user = await this.findOne({username});

        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        try {
            const isMatched = await compare(password, user.password);

            if (!isMatched) {
                throw new BadRequestException('Wrong password');
            }
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }

        const token = await this.authService.signIn(user.username, user.role);

        return new LoginResponseVm(token, user);
    }

    async createUser(params: CreateUserParams): Promise<User> {
        const newUser = this.createModel(params);
        return this.create(newUser);
    }

    async changePassword(id: string, current: string, newPassword: string, byAdmin: boolean = false): Promise<boolean> {
        const user = await this.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!byAdmin) {
            const isMatched = await compare(current, user.password);

            if (!isMatched) {
                throw new BadRequestException('Wrong password');
            }
        }

        user.password = newPassword;
        await this.update(user.id, user);
        return true;
    }

    async updateUser(vm: UserVm): Promise<User> {
        const user = await this.findById(vm.id);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        user.role = vm.role;
        user.username = vm.username;

        return this.update(user.id, user);
    }
}
