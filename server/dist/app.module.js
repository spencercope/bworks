"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const shared_module_1 = require("./shared/shared.module");
const file_reference_module_1 = require("./file-reference/file-reference.module");
const donor_module_1 = require("./donor/donor.module");
const item_module_1 = require("./item/item.module");
const history_module_1 = require("./history/history.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:admin@bworks1-sknsg.gcp.mongodb.net/test?retryWrites=true', {
                retryAttempts: 5,
                retryDelay: 300,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }),
            shared_module_1.SharedModule,
            user_module_1.UserModule,
            file_reference_module_1.FileReferenceModule,
            donor_module_1.DonorModule,
            item_module_1.ItemModule,
            history_module_1.HistoryModule,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map