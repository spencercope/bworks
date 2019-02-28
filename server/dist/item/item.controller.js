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
const item_service_1 = require("./item.service");
const item_vm_1 = require("./models/item-vm");
const swagger_1 = require("@nestjs/swagger");
const to_boolean_pipe_1 = require("../shared/pipes/to-boolean.pipe");
const custom_api_errors_decorator_1 = require("../shared/decorators/custom-api-errors.decorator");
const custom_api_operation_decorator_1 = require("../shared/decorators/custom-api-operation.decorator");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_model_1 = require("../user/models/user.model");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    createItem(donorId, barcodeId = '', isOffsite = false, itemVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemService.createBaseItem(donorId, itemVm, isOffsite, barcodeId);
            return new item_vm_1.ItemVm(item);
        });
    }
    updateBikeItem(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = yield this.itemService.updateBike(id, vm);
            return new item_vm_1.BikeVm(bike);
        });
    }
    updatePcItem(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const pc = yield this.itemService.updatePc(id, vm);
            return new item_vm_1.PCVm(pc);
        });
    }
    updatePartItem(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const part = yield this.itemService.updatePart(id, vm);
            return new item_vm_1.PartVm(part);
        });
    }
    updateMiscItem(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const misc = yield this.itemService.updateMisc(id, vm);
            return new item_vm_1.MiscVm(misc);
        });
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.itemService.findAll();
            return items.map(item => new item_vm_1.ItemVm(item));
        });
    }
    getBikes() {
        return __awaiter(this, void 0, void 0, function* () {
            const bikes = yield this.itemService.getBikes();
            return bikes.map(bike => new item_vm_1.BikeVm(bike));
        });
    }
    getPCs() {
        return __awaiter(this, void 0, void 0, function* () {
            const pcs = yield this.itemService.getPCs();
            return pcs.map(pc => new item_vm_1.PCVm(pc));
        });
    }
    getParts() {
        return __awaiter(this, void 0, void 0, function* () {
            const parts = yield this.itemService.getParts();
            return parts.map(part => new item_vm_1.PartVm(part));
        });
    }
    getMiscs() {
        return __awaiter(this, void 0, void 0, function* () {
            const miscs = yield this.itemService.getMiscs();
            return miscs.map(misc => new item_vm_1.MiscVm(misc));
        });
    }
    getBikeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = yield this.itemService.getBikeById(id);
            return new item_vm_1.BikeVm(bike);
        });
    }
    getPcById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pc = yield this.itemService.getPcById(id);
            return new item_vm_1.PCVm(pc);
        });
    }
    getPartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const part = yield this.itemService.getPartById(id);
            return new item_vm_1.PartVm(part);
        });
    }
    getMiscById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const misc = yield this.itemService.getMiscById(id);
            return new item_vm_1.MiscVm(misc);
        });
    }
    getItemByBarcodeId(barcodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemService.findOne({ barcodeId });
            return new item_vm_1.ItemVm(item);
        });
    }
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.itemService.delete(id);
            return true;
        });
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiCreatedResponse({ type: item_vm_1.ItemVm }),
    swagger_1.ApiImplicitQuery({ name: 'isOffsite', required: false }),
    swagger_1.ApiImplicitQuery({ name: 'barcodeId', required: false }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'CreateBaseItem' }),
    __param(0, common_1.Query('donorId')),
    __param(1, common_1.Query('barcodeId')),
    __param(2, common_1.Query('isOffsite', new to_boolean_pipe_1.ToBooleanPipe())),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, item_vm_1.ItemVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "createItem", null);
__decorate([
    common_1.Put('bike/:id'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin, user_model_1.UserRole.Staff),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({ type: item_vm_1.BikeVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'UpdateBikeItem' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.BikeVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateBikeItem", null);
__decorate([
    common_1.Put('pc/:id'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin, user_model_1.UserRole.Staff),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({ type: item_vm_1.PCVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'UpdatePcItem' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.PCVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updatePcItem", null);
__decorate([
    common_1.Put('part/:id'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin, user_model_1.UserRole.Staff),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({ type: item_vm_1.PartVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'UpdatePartItem' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.PartVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updatePartItem", null);
__decorate([
    common_1.Put('misc/:id'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin, user_model_1.UserRole.Staff),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({ type: item_vm_1.MiscVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'UpdateMiscItem' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.MiscVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateMiscItem", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOkResponse({ type: item_vm_1.ItemVm, isArray: true }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetAllItems' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getAllItems", null);
__decorate([
    common_1.Get('bikes'),
    swagger_1.ApiOkResponse({ type: item_vm_1.BikeVm, isArray: true }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetAllBikes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getBikes", null);
__decorate([
    common_1.Get('pcs'),
    swagger_1.ApiOkResponse({ type: item_vm_1.PCVm, isArray: true }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetAllPCs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getPCs", null);
__decorate([
    common_1.Get('parts'),
    swagger_1.ApiOkResponse({ type: item_vm_1.PartVm, isArray: true }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetAllParts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getParts", null);
__decorate([
    common_1.Get('miscs'),
    swagger_1.ApiOkResponse({ type: item_vm_1.MiscVm, isArray: true }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetAllMiscs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getMiscs", null);
__decorate([
    common_1.Get('bikes/:id'),
    swagger_1.ApiOkResponse({ type: item_vm_1.BikeVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetBikeById' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getBikeById", null);
__decorate([
    common_1.Get('pcs/:id'),
    swagger_1.ApiOkResponse({ type: item_vm_1.PCVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetPcById' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getPcById", null);
__decorate([
    common_1.Get('parts/:id'),
    swagger_1.ApiOkResponse({ type: item_vm_1.PartVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetPartById' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getPartById", null);
__decorate([
    common_1.Get('miscs/:id'),
    swagger_1.ApiOkResponse({ type: item_vm_1.MiscVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetMiscById' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getMiscById", null);
__decorate([
    common_1.Get(':barcodeId'),
    swagger_1.ApiOkResponse({ type: item_vm_1.ItemVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'GetItemByBarcodeId' }),
    __param(0, common_1.Param('barcodeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getItemByBarcodeId", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles(user_model_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ type: Boolean }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'DeleteItem' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "deleteItem", null);
ItemController = __decorate([
    common_1.Controller('items'),
    swagger_1.ApiUseTags('Item'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map