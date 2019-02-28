"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("../../shared/base.model");
const mongoose_1 = require("mongoose");
exports.donorSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    zip: {
        type: Number,
        maxlength: 5
    },
    phoneNumber: String,
    donations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    refSource: String,
}, base_model_1.schemaOptions);
exports.donorSchema.virtual('name').get(function () {
    return this.firstName + ' ' + this.lastName;
});
exports.donorSchema.pre("findOneAndUpdate", function (next) {
    this.updatedAt = new Date(Date.now());
    return next();
});
//# sourceMappingURL=donor.model.js.map