import {BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {BaseService} from 'shared/base.service';
import {User} from './models/user.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LoginResponseVm} from './models/login-response-vm';
import {LoginParams} from './models/login-params';
import {AuthService} from "../shared/auth/auth.service";
import {compare} from "bcrypt";

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
}
