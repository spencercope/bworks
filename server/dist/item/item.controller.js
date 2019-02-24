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
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    createItem(donorId, itemVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemService.createBaseItem(donorId, itemVm);
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
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Query('donorId')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.ItemVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "createItem", null);
__decorate([
    common_1.Put('bike/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.BikeVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateBikeItem", null);
__decorate([
    common_1.Put('pc/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.PCVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updatePcItem", null);
__decorate([
    common_1.Put('part/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.PartVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updatePartItem", null);
__decorate([
    common_1.Put('misc/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_vm_1.MiscVm]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateMiscItem", null);
ItemController = __decorate([
    common_1.Controller('items'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map