"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const login_params_1 = require("./models/login-params");
const user_vm_1 = require("./models/user-vm");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_model_1 = require("./models/user.model");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
const custom_auth_user_decorator_1 = require("../shared/decorators/custom-auth-user.decorator");
const create_user_params_1 = require("./models/create-user-params");
const change_password_params_1 = require("./models/change-password-params");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.login(params);
        });
    }
    register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.register(params);
            return new user_vm_1.UserVm(user);
        });
    }
    getAllUsers(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.findAll();
            return users.map(user => new user_vm_1.UserVm(user));
        });
    }
    me(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new user_vm_1.UserVm(currentUser);
        });
    }
    createUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.createUser(params);
            return new user_vm_1.UserVm(user);
        });
    }
    changePassword(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.changePassword(id, params.current, params.newPassword);
        });
    }
    changePasswordByAdmin(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.changePassword(id, '', newPassword, true);
        });
    }
    updateUser(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.updateUser(vm);
            return new user_vm_1.UserVm(user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findById(id);
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            yield this.userService.delete(id);
            return true;
        });
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_params_1.LoginParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_params_1.LoginParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.Get(),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, custom_auth_user_decorator_1.CustomAuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get('me'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, custom_auth_user_decorator_1.CustomAuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    common_1.Post('create-user'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_params_1.CreateUserParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Post('change-password/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_password_params_1.ChangePasswordParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    common_1.Post('change-password-admin/:id'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Body('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePasswordByAdmin", null);
__decorate([
    common_1.Put('update'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_vm_1.UserVm]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.Delete('delete/:id'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map