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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const history_model_1 = require("./models/history.model");
const base_service_1 = require("../shared/base.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let HistoryService = class HistoryService extends base_service_1.BaseService {
    constructor(_historyModel) {
        super();
        this._historyModel = _historyModel;
        this._model = _historyModel;
        this._todoModel = _historyModel.discriminator('Todo', history_model_1.todoSchema);
        this._storyModel = _historyModel.discriminator('Story', history_model_1.storySchema);
    }
};
HistoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('History')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map