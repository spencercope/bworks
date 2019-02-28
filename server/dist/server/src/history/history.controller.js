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
const history_service_1 = require("./history.service");
const history_vm_1 = require("./models/history-vm");
const to_boolean_pipe_1 = require("../shared/pipes/to-boolean.pipe");
const swagger_1 = require("@nestjs/swagger");
const custom_api_errors_decorator_1 = require("../shared/decorators/custom-api-errors.decorator");
const custom_api_operation_decorator_1 = require("../shared/decorators/custom-api-operation.decorator");
let HistoryController = class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    addTodoToBike(bikeId, isTransferred = false, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.historyService.addTodoToBike(bikeId, isTransferred, vm);
            return new history_vm_1.TodoVm(todo);
        });
    }
    addStoryToBike(bikeId, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const story = yield this.historyService.addStoryToBike(bikeId, vm);
            return new history_vm_1.StoryVm(story);
        });
    }
    addTodoToPc(pcId, isTransferred = false, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.historyService.addTodoToPc(pcId, isTransferred, vm);
            return new history_vm_1.TodoVm(todo);
        });
    }
    addStoryToPc(pcId, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const story = yield this.historyService.addStoryToPc(pcId, vm);
            return new history_vm_1.StoryVm(story);
        });
    }
    transferTodo(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const story = yield this.historyService.transferTodoToStory(todoId);
            return new history_vm_1.StoryVm(story);
        });
    }
};
__decorate([
    common_1.Post('todo/bike'),
    swagger_1.ApiCreatedResponse({ type: history_vm_1.TodoVm }),
    swagger_1.ApiImplicitQuery({ name: 'transferred', required: false }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'AddTodoToBike' }),
    __param(0, common_1.Query('bikeId')),
    __param(1, common_1.Query('transferred', new to_boolean_pipe_1.ToBooleanPipe())),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, history_vm_1.TodoVm]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "addTodoToBike", null);
__decorate([
    common_1.Post('story/bike'),
    swagger_1.ApiCreatedResponse({ type: history_vm_1.StoryVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'AddStoryToBike' }),
    __param(0, common_1.Query('bikeId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, history_vm_1.StoryVm]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "addStoryToBike", null);
__decorate([
    common_1.Post('todo/pc'),
    swagger_1.ApiCreatedResponse({ type: history_vm_1.TodoVm }),
    swagger_1.ApiImplicitQuery({ name: 'transferred', required: false }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'AddTodoToPc' }),
    __param(0, common_1.Query('pcId')),
    __param(1, common_1.Query('transferred', new to_boolean_pipe_1.ToBooleanPipe())),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, history_vm_1.TodoVm]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "addTodoToPc", null);
__decorate([
    common_1.Post('story/pc'),
    swagger_1.ApiCreatedResponse({ type: history_vm_1.TodoVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'AddStoryToPc' }),
    __param(0, common_1.Query('pcId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, history_vm_1.StoryVm]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "addStoryToPc", null);
__decorate([
    common_1.Get('transfer/:id'),
    swagger_1.ApiCreatedResponse({ type: history_vm_1.StoryVm }),
    custom_api_errors_decorator_1.CustomApiDefaultErrors(),
    custom_api_operation_decorator_1.CustomApiOperation({ title: 'TransferTodoToStory' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "transferTodo", null);
HistoryController = __decorate([
    common_1.Controller('histories'),
    swagger_1.ApiUseTags('History'),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], HistoryController);
exports.HistoryController = HistoryController;
//# sourceMappingURL=history.controller.js.map