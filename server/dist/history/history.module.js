"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const history_service_1 = require("./history.service");
const history_controller_1 = require("./history.controller");
const mongoose_1 = require("@nestjs/mongoose");
const history_model_1 = require("./models/history.model");
const item_module_1 = require("../item/item.module");
const email_module_1 = require("../shared/email/email.module");
const donor_module_1 = require("../donor/donor.module");
let HistoryModule = class HistoryModule {
};
HistoryModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'History', schema: history_model_1.historySchema }]), item_module_1.ItemModule, donor_module_1.DonorModule, email_module_1.EmailModule],
        providers: [history_service_1.HistoryService],
        controllers: [history_controller_1.HistoryController]
    })
], HistoryModule);
exports.HistoryModule = HistoryModule;
//# sourceMappingURL=history.module.js.map