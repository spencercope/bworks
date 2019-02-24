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
const history_model_1 = require("./models/history.model");
const base_service_1 = require("../shared/base.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_model_1 = require("../item/models/item.model");
const item_service_1 = require("../item/item.service");
const email_service_1 = require("../shared/email/email.service");
const email_templates_enum_1 = require("../shared/email/email-templates.enum");
const donor_service_1 = require("../donor/donor.service");
let HistoryService = class HistoryService extends base_service_1.BaseService {
    constructor(_historyModel, itemService, donorService, emailService) {
        super();
        this._historyModel = _historyModel;
        this.itemService = itemService;
        this.donorService = donorService;
        this.emailService = emailService;
        this._model = _historyModel;
        this._todoModel = _historyModel.discriminator('Todo', history_model_1.todoSchema);
        this._storyModel = _historyModel.discriminator('Story', history_model_1.storySchema);
    }
    addTodoToBike(bikeId, isTransferred, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTodo = new this._todoModel({ itemId: bikeId, isTransferred });
            newTodo.person = vm.person;
            newTodo.status = item_model_1.Status.Progress;
            newTodo.note = vm.note;
            const todo = yield this._todoModel.create(newTodo);
            const bike = yield this.itemService.getBikeById(bikeId);
            bike.todos.push(todo);
            yield bike.save();
            return todo;
        });
    }
    addStoryToBike(bikeId, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStory = new this._storyModel({ itemId: bikeId });
            newStory.person = vm.person;
            newStory.status = vm.status;
            newStory.note = vm.note;
            const story = yield this._storyModel.create(newStory);
            const bike = yield this.itemService.getBikeById(bikeId);
            bike.stories.push(story);
            yield bike.save();
            const donor = yield this.donorService.findById(bike.donorId);
            yield this.sendNewStoryEmail(donor, bike);
            return story;
        });
    }
    addStoryToPc(pcId, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStory = new this._storyModel({ itemId: pcId });
            newStory.person = vm.person;
            newStory.status = vm.status;
            newStory.note = vm.note;
            const story = yield this._storyModel.create(newStory);
            const pc = yield this.itemService.getPcById(pcId);
            pc.stories.push(story);
            yield pc.save();
            const donor = yield this.donorService.findById(pc.donorId);
            yield this.sendNewStoryEmail(donor, pc);
            return story;
        });
    }
    addTodoToPc(pcId, isTransferred, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTodo = new this._todoModel({ itemId: pcId, isTransferred });
            newTodo.person = vm.person;
            newTodo.status = item_model_1.Status.Progress;
            newTodo.note = vm.note;
            const todo = yield this._todoModel.create(newTodo);
            const pc = yield this.itemService.getPcById(pcId);
            pc.todos.push(todo);
            yield pc.save();
            return todo;
        });
    }
    transferTodoToStory(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this._todoModel.findById(todoId);
            todo.isTransferred = true;
            const { note, person, itemId, createdAt, updatedAt } = todo;
            const newStory = new this._storyModel({ note, person, itemId, createdAt, updatedAt });
            newStory.transferredFromTodo = true;
            const story = yield this._storyModel.create(newStory);
            yield this.delete(todo.id);
            const item = yield this.itemService.getItemById(itemId);
            if (!item) {
                throw new common_1.BadRequestException('Item does not have History');
            }
            item.todos = item.todos.filter(td => td.id !== todoId);
            item.stories.push(story);
            yield this.itemService.update(item.id, item);
            const donor = yield this.donorService.findById(item.donorId);
            yield this.sendNewStoryEmail(donor, item);
            return story;
        });
    }
    sendNewStoryEmail(donor, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                firstName: donor.firstName,
                images: item.images.map(image => image.publicUrl),
                stories: item.stories
            };
            return this.emailService.sendEmail(email_templates_enum_1.EmailTemplates.NewStory, donor.email, '', data);
        });
    }
};
HistoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('History')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        item_service_1.ItemService,
        donor_service_1.DonorService,
        email_service_1.EmailService])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map