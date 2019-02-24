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
const history_model_1 = require("./history.model");
const item_model_1 = require("../../item/models/item.model");
const swagger_1 = require("@nestjs/swagger");
class HistoryVm extends base_vm_1.BaseVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        this.status = model.status;
        this.itemId = model.itemId;
        this.person = model.person;
        this.note = model.note;
        this.historyType = model.historyType;
    }
}
__decorate([
    swagger_1.ApiModelProperty({ type: String, enum: item_model_1.Status }),
    __metadata("design:type", String)
], HistoryVm.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], HistoryVm.prototype, "itemId", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], HistoryVm.prototype, "person", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], HistoryVm.prototype, "note", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, enum: history_model_1.HistoryType }),
    __metadata("design:type", String)
], HistoryVm.prototype, "historyType", void 0);
exports.HistoryVm = HistoryVm;
class TodoVm extends HistoryVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.isTransferred = model.isTransferred;
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Boolean)
], TodoVm.prototype, "isTransferred", void 0);
exports.TodoVm = TodoVm;
class StoryVm extends HistoryVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.transferredFromTodo = model.transferredFromTodo;
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Boolean)
], StoryVm.prototype, "transferredFromTodo", void 0);
exports.StoryVm = StoryVm;
//# sourceMappingURL=history-vm.js.map