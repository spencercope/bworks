"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
class BaseService {
    createModel(doc) {
        return new this._model(doc);
    }
    findAll(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.find(filter).exec();
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(err.message, err.toString());
            }
        });
    }
    findOne(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.findOne(filter).exec();
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(err.message, err.toString());
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.findById(this.toObjectId(id)).exec();
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(err.message, err.toString());
            }
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.create(item);
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(err.message, err.toString());
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(err.message, err.toString());
            }
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(err.message, err.toString());
            }
        });
    }
    clearCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.deleteMany({}).exec();
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(err.message, err.toString());
            }
        });
    }
    counts(conditions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this._model.countDocuments(conditions);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e.message, e.toString());
            }
        });
    }
    toObjectId(id) {
        return mongoose_1.Types.ObjectId(id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map