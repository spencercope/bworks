"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const file_reference_service_1 = require("./file-reference.service");
const file_reference_controller_1 = require("./file-reference.controller");
const mongoose_1 = require("@nestjs/mongoose");
const file_reference_model_1 = require("./models/file-reference.model");
const item_module_1 = require("../item/item.module");
let FileReferenceModule = class FileReferenceModule {
};
FileReferenceModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'FileReference', schema: file_reference_model_1.fileReferenceSchema }]), item_module_1.ItemModule],
        providers: [file_reference_service_1.FileReferenceService],
        controllers: [file_reference_controller_1.FileReferenceController]
    })
], FileReferenceModule);
exports.FileReferenceModule = FileReferenceModule;
//# sourceMappingURL=file-reference.module.js.map