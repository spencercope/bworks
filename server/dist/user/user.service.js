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
const base_service_1 = require("shared/base.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const login_response_vm_1 = require("./models/login-response-vm");
const auth_service_1 = require("../shared/auth/auth.service");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService extends base_service_1.BaseService {
    constructor(_userModel, authService) {
        super();
        this._userModel = _userModel;
        this.authService = authService;
        this._model = _userModel;
    }
    register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const existed = yield this.findOne({ username: params.username });
            if (existed) {
                throw new common_1.BadRequestException('Username existed');
            }
            const newUser = this.createModel(params);
            return yield this.create(newUser);
        });
    }
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = params;
            const user = yield this.findOne({ username });
            if (!user) {
                throw new common_1.BadRequestException('User does not exist');
            }
            try {
                const isMatched = yield bcrypt_1.compare(password, user.password);
                if (!isMatched) {
                    throw new common_1.BadRequestException('Wrong password');
                }
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e.message);
            }
            const token = yield this.authService.signIn(user.username, user.role);
            return new login_response_vm_1.LoginResponseVm(token, user);
        });
    }
    createUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.createModel(params);
            return this.create(newUser);
        });
    }
    changePassword(id, current, newPassword, byAdmin = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!byAdmin) {
                const isMatched = yield bcrypt_1.compare(current, user.password);
                if (!isMatched) {
                    throw new common_1.BadRequestException('Wrong password');
                }
            }
            user.password = newPassword;
            yield user.save();
            return true;
        });
    }
    updateUser(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(vm.id);
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            user.role = vm.role;
            user.username = vm.username;
            return this.update(user.id, user);
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __param(1, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map