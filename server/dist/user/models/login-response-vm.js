"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_vm_1 = require("./user-vm");
class LoginResponseVm {
    constructor(token, user) {
        this.accessToken = token;
        this.user = new user_vm_1.UserVm(user);
    }
}
exports.LoginResponseVm = LoginResponseVm;
//# sourceMappingURL=login-response-vm.js.map