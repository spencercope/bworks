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
const base_service_1 = require("../shared/base.service");
const item_model_1 = require("./models/item.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const donor_service_1 = require("../donor/donor.service");
let ItemService = class ItemService extends base_service_1.BaseService {
    constructor(_itemModel, donorService) {
        super();
        this._itemModel = _itemModel;
        this.donorService = donorService;
        this._model = _itemModel;
        this._bikeModel = _itemModel.discriminator('Bike', item_model_1.bikeSchema);
        this._pcModel = _itemModel.discriminator('PC', item_model_1.pcSchema);
        this._miscModel = _itemModel.discriminator('Misc', item_model_1.miscAndPartSchema);
        this._partModel = _itemModel.discriminator('Part', item_model_1.miscAndPartSchema);
    }
    createBaseItem(donorId, itemVm, isOffsite, barcodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const donor = yield this.donorService.findById(donorId);
            if (!donor) {
                throw new common_1.NotFoundException('Donor not found');
            }
            const newItem = this.createModel({ donorId: donor.id, type: itemVm.type, notes: itemVm.notes });
            const count = yield this.counts();
            if (isOffsite) {
                if (!barcodeId) {
                    throw new common_1.BadRequestException('Barcode is required for Offsite item');
                }
                newItem.barcodeId = barcodeId;
            }
            else {
                newItem.barcodeId = (count + 1).toString();
            }
            const item = yield this.create(newItem);
            donor.donations.push(item);
            yield donor.save();
            return item;
        });
    }
    updateBike(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = yield this._bikeModel.findById(id).exec();
            if (!bike) {
                throw new common_1.NotFoundException('Bike not found');
            }
            bike.attributes = vm.attributes;
            bike.status = vm.status;
            bike.user = vm.user;
            bike.notes = vm.notes;
            bike.wikiLinks = vm.wikiLinks;
            return this._bikeModel.findByIdAndUpdate(bike.id, bike, { new: true })
                .populate('images')
                .populate('todos')
                .populate('stories');
        });
    }
    updatePc(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const pc = yield this._pcModel.findById(id);
            if (!pc) {
                throw new common_1.NotFoundException('PC not found');
            }
            pc.attributes = vm.attributes;
            pc.status = vm.status;
            pc.user = vm.user;
            pc.notes = vm.notes;
            pc.wikiLinks = vm.wikiLinks;
            return this._pcModel.findByIdAndUpdate(pc.id, pc, { new: true })
                .populate('images')
                .populate('todos')
                .populate('stories');
            ;
        });
    }
    updatePart(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const part = yield this._partModel.findById(id);
            if (!part) {
                throw new common_1.NotFoundException('Part not found');
            }
            part.name = vm.name;
            part.description = vm.description;
            part.wikiLinks = vm.wikiLinks;
            return this._partModel.findByIdAndUpdate(part.id, part, { new: true });
        });
    }
    updateMisc(id, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const misc = yield this._miscModel.findById(id);
            if (!misc) {
                throw new common_1.NotFoundException('Misc not found');
            }
            misc.name = vm.name;
            misc.description = vm.description;
            misc.wikiLinks = vm.wikiLinks;
            return this._miscModel.findByIdAndUpdate(misc.id, misc, { new: true });
        });
    }
    getItemById(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.findById(itemId);
            switch (item.type) {
                case item_model_1.ItemType.Bike:
                    return yield this.getBikeById(itemId);
                case item_model_1.ItemType.PC:
                    return yield this.getPcById(itemId);
                case item_model_1.ItemType.Part:
                case item_model_1.ItemType.Misc:
                    return null;
            }
        });
    }
    getMiscById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._miscModel.findById(id);
        });
    }
    getPartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._partModel.findById(id);
        });
    }
    getPcById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._pcModel.findById(id)
                .populate('images')
                .populate('todos')
                .populate('stories');
        });
    }
    getBikeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._bikeModel.findById(id)
                .populate('images')
                .populate('todos')
                .populate('stories');
        });
    }
    getMiscs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._miscModel.find();
        });
    }
    getParts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._partModel.find();
        });
    }
    getPCs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._pcModel.find()
                .populate('images')
                .populate('todos')
                .populate('stories');
        });
    }
    getBikes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._bikeModel.find()
                .populate('images')
                .populate('todos')
                .populate('stories');
        });
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Item')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        donor_service_1.DonorService])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map