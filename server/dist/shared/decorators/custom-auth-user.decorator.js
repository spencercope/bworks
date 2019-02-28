"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.CustomAuthUser = common_1.createParamDecorator(((authUserKey, req) => {
    return req['user'];
}));
//# sourceMappingURL=custom-auth-user.decorator.js.map