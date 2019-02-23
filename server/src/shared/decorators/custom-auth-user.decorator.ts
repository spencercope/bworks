import { createParamDecorator } from '@nestjs/common';
import { User } from '../../user/models/user.model';

export const CustomAuthUser = createParamDecorator(((authUserKey, req) => {
    return req['user'] as User;
}));
