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
const base_model_1 = require("shared/base.model");
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
var UserRole;
(function (UserRole) {
    UserRole["Volunteer"] = "volunteer";
    UserRole["Staff"] = "staff";
    UserRole["Admin"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['volunteer', 'staff', 'admin'],
        default: 'volunteer'
    },
}, base_model_1.schemaOptions);
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified('password'))
                return next();
            const salt = yield bcrypt_1.genSalt(10);
            this.password = yield bcrypt_1.hash(this.password, salt);
            return next();
        }
        catch (e) {
            return next(e);
        }
    });
});
exports.userSchema.pre("findOneAndUpdate", function (next) {
    this.updatedAt = new Date(Date.now());
    return next();
});
//# sourceMappingURL=user.model.js.map