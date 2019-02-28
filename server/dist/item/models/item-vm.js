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
const item_model_1 = require("./item.model");
const file_reference_vm_1 = require("../../file-reference/models/file-reference-vm");
const history_vm_1 = require("../../history/models/history-vm");
const swagger_1 = require("@nestjs/swagger");
class ItemVm extends base_vm_1.BaseVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        this.donorId = model.donorId;
        this.barcodeId = model.barcodeId;
        this.type = model.type;
        this.notes = model.notes;
        this.user = model.user;
        this.status = model.status;
        this.images = model.images ? model.images.map(image => new file_reference_vm_1.FileReferenceVm(image)) : [];
        this.wikiLinks = model.wikiLinks;
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ItemVm.prototype, "donorId", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String, enum: item_model_1.ItemType }),
    __metadata("design:type", String)
], ItemVm.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ItemVm.prototype, "notes", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: file_reference_vm_1.FileReferenceVm, isArray: true }),
    __metadata("design:type", Array)
], ItemVm.prototype, "images", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ItemVm.prototype, "user", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String, enum: item_model_1.Status }),
    __metadata("design:type", String)
], ItemVm.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ItemVm.prototype, "barcodeId", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ isArray: true, type: String }),
    __metadata("design:type", Array)
], ItemVm.prototype, "wikiLinks", void 0);
exports.ItemVm = ItemVm;
class BikeVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.attributes = model.attributes;
        this.todos = model.todos.map(todo => new history_vm_1.TodoVm(todo));
        this.stories = model.stories.map(story => new history_vm_1.StoryVm(story));
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: item_model_1.BikeAttribute }),
    __metadata("design:type", item_model_1.BikeAttribute)
], BikeVm.prototype, "attributes", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: history_vm_1.TodoVm, isArray: true }),
    __metadata("design:type", Array)
], BikeVm.prototype, "todos", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: history_vm_1.StoryVm, isArray: true }),
    __metadata("design:type", Array)
], BikeVm.prototype, "stories", void 0);
exports.BikeVm = BikeVm;
class PCVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.attributes = model.attributes;
        this.todos = model.todos.map(todo => new history_vm_1.TodoVm(todo));
        this.stories = model.stories.map(story => new history_vm_1.StoryVm(story));
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: item_model_1.PCAttribute }),
    __metadata("design:type", item_model_1.PCAttribute)
], PCVm.prototype, "attributes", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: history_vm_1.TodoVm, isArray: true }),
    __metadata("design:type", Array)
], PCVm.prototype, "todos", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: history_vm_1.StoryVm, isArray: true }),
    __metadata("design:type", Array)
], PCVm.prototype, "stories", void 0);
exports.PCVm = PCVm;
class PartVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.name = model.name;
        this.description = model.description;
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], PartVm.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], PartVm.prototype, "description", void 0);
exports.PartVm = PartVm;
class MiscVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.name = model.name;
        this.description = model.description;
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], MiscVm.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], MiscVm.prototype, "description", void 0);
exports.MiscVm = MiscVm;
//# sourceMappingURL=item-vm.js.map