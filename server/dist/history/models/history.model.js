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
        enum: [
            'Donation Received',
            'Scrapped',
            'Donated',
            'Sold',
            'Earn A Bike Picked Up',
            'Earn A Bike Graduation',
            'Earn A PC',
            'In Progress'
        ]
    },
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Item'
    },
    person: String,
    note: String,
    historyType: {
        type: String,
        enum: ['Internal', 'External']
    }
}, Object.assign({}, base_model_1.schemaOptions, { discriminatorKey: 'historyType' }));
exports.todoSchema = new mongoose_1.Schema({
    isTransferred: {
        type: Boolean,
        default: false
    }
}, { discriminatorKey: 'historyType' });
exports.storySchema = new mongoose_1.Schema({
    transferredFromTodo: {
        type: Boolean,
        default: false
    }
}, { discriminatorKey: 'historyType' });
//# sourceMappingURL=history.model.js.map