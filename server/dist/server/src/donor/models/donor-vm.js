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
Object.defineProperty(exports, "__esModule", { value: true });
const base_vm_1 = require("../../shared/base-vm");
const swagger_1 = require("@nestjs/swagger");
const item_vm_1 = require("../../item/models/item-vm");
class DonorVm extends base_vm_1.BaseVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.email = model.email;
        this.zip = model.zip;
        this.phoneNumber = model.phoneNumber;
        this.donations = model.donations.map(donation => new item_vm_1.ItemVm(donation));
        this.refSource = model.refSource;
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DonorVm.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DonorVm.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DonorVm.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], DonorVm.prototype, "zip", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DonorVm.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: item_vm_1.ItemVm, isArray: true }),
    __metadata("design:type", Array)
], DonorVm.prototype, "donations", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DonorVm.prototype, "refSource", void 0);
exports.DonorVm = DonorVm;
//# sourceMappingURL=donor-vm.js.map