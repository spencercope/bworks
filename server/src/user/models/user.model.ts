import {BaseDocument, schemaOptions} from '../../shared/base.model';
import {Schema} from 'mongoose';
import {genSalt, hash} from 'bcrypt';

export enum UserRole {
    Volunteer = 'volunteer',
    Staff = 'staff',
    Admin = 'admin'
}

export interface User extends BaseDocument {
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    password: string;
    role: UserRole;
}

export const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['volunteer', 'staff', 'admin'],
        default: 'volunteer'
    },
}, schemaOptions);

userSchema.virtual('name').get(function () {
    return this.firstName + ' ' + this.lastName;
});

userSchema.pre<User>('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        return next();
    } catch (e) {
        return next(e);
    }
});

userSchema.pre<User>("findOneAndUpdate", function (next) {
    this.updatedAt = new Date(Date.now());
    return next();
});
