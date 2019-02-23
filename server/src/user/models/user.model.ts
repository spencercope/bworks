import { BaseDocument, schemaOptions } from 'shared/base.model';
import { Schema } from 'mongoose';
import { genSalt, hash } from 'bcrypt';

export enum UserRole {
    Volunteer = 'volunteer',
    Admin = 'admin',
    SuperAdmin = 'superAdmin'
}

export interface User extends BaseDocument {
    username: string;
    password: string;
    role: UserRole;
}

export const userSchema = new Schema({
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
        enum: ['volunteer', 'admin', 'superAdmin'],
        default: 'volunteer'
    },
}, schemaOptions);

userSchema.pre<User>('save', async function(next) {
    try {
        this.updatedAt = new Date(Date.now());
        if (!this.isModified('password')) return next();

        const salt = await genSalt(10);
        const hashPassword = await hash(this.password, salt);
        this.password = hashPassword;
        return next();
    } catch (e) {
        return next(e);
    }
});
