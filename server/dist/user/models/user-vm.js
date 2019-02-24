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
const user_model_1 = require("./user.model");
const swagger_1 = require("@nestjs/swagger");
class UserVm extends base_vm_1.BaseVm {
    constructor(model = null) {
        super(model);
    }
    getViewModel(model) {
        this.username = model.username;
        this.role = model.role;
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserVm.prototype, "username", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String, enum: user_model_1.UserRole }),
    __metadata("design:type", String)
], UserVm.prototype, "role", void 0);
exports.UserVm = UserVm;
//# sourceMappingURL=user-vm.js.map