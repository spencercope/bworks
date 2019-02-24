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
const donor_service_1 = require("./donor.service");
const swagger_1 = require("@nestjs/swagger");
const donor_vm_1 = require("./models/donor-vm");
const custom_api_errors_decorator_1 = require("../shared/decorators/custom-api-errors.decorator");
const custom_api_operation_decorator_1 = require("../shared/decorators/custom-api-operation.decorator");
const create_donor_params_1 = require("./models/create-donor-params");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_model_1 = require("../user/models/user.model");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
let DonorController = class DonorController {
    constructor(donorService) {
        this.donorService = donorService;
    }
    createDonor(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const donor = yield this.donorService.createDonor(params);
            return new donor_vm_1.DonorVm(donor);
        });
    }
    gelAllDonors() {
        return __awaiter(this, void 0, void 0, function* () {
            const donors = yield this.donorService.findAll();
            return donors.map(donor => new donor_vm_1.DonorVm(donor));
        });
    }
    getDonorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const donor = yield this.donorService.findById(id);
            return new donor_vm_1.DonorVm(donor);
        });
    }
    searchDonor(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const donor = yield this.donorService.findOne({ email });
            return new donor_vm_1.DonorVm(donor);
        });
    }
    updateDonor(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.donorService.updateDonor(vm);
            return new donor_vm_1.DonorVm(updated);
        });
    }
};
__decorate([
    common_1.Post('create'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin, user_model_1.UserRole.Staff, user_model_1.UserRole.Volunteer),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiCreatedResponse({ type: donor_vm_1.DonorVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'CreateDonor' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_donor_params_1.CreateDonorParams]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "createDonor", null);
__decorate([
    common_1.Get(),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiOkResponse({ type: donor_vm_1.DonorVm, isArray: true }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetAllDonors' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "gelAllDonors", null);
__decorate([
    common_1.Get(':id'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiOkResponse({ type: donor_vm_1.DonorVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetDonorById' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorById", null);
__decorate([
    common_1.Get(':email'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin, user_model_1.UserRole.Staff, user_model_1.UserRole.Volunteer),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiOkResponse({ type: donor_vm_1.DonorVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'SearchDonor' }),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "searchDonor", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiCreatedResponse({ type: donor_vm_1.DonorVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'UpdateDonor' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donor_vm_1.DonorVm]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateDonor", null);
DonorController = __decorate([
    common_1.Controller('api/donors'),
    swagger_1.ApiUseTags('Donor'),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [donor_service_1.DonorService])
], DonorController);
exports.DonorController = DonorController;
//# sourceMappingURL=donor.controller.js.map