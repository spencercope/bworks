"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("../../shared/base.model");
const mongoose_1 = require("mongoose");
var HistoryType;
(function (HistoryType) {
    HistoryType["Internal"] = "Internal";
    HistoryType["External"] = "External";
})(HistoryType = exports.HistoryType || (exports.HistoryType = {}));
exports.historySchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: ['received', 'scraped', 'donated', 'sold', 'earn-bike', 'earn-pc', 'progress']
    },
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Item'
    },
    person: String,
    note: String,
    type: {
        type: String,
        enum: ['Internal', 'External']
    }
}, Object.assign({}, base_model_1.schemaOptions, { discriminatorKey: 'type' }));
exports.todoSchema = new mongoose_1.Schema({
    isTransferred: {
        type: Boolean,
        default: false
    }
}, { discriminatorKey: 'type' });
exports.storySchema = new mongoose_1.Schema({
    transferredFromTodo: {
        type: Boolean,
        default: false
    }
}, { discriminatorKey: 'type' });
//# sourceMappingURL=history.model.js.map