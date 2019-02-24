"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("../../shared/base.model");
const mongoose_1 = require("mongoose");
exports.fileReferenceSchema = new mongoose_1.Schema({
    publicUrl: {
        type: String,
        required: true,
    },
    fileName: String,
    sizeBytes: Number,
    note: String,
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Item'
    }
}, base_model_1.schemaOptions);
exports.fileReferenceSchema.pre("findOneAndUpdate", function (next) {
    this.updatedAt = new Date(Date.now());
    return next();
});
//# sourceMappingURL=file-reference.model.js.map