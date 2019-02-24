import { BaseDocument } from '../../shared/base.model';
import { Schema } from 'mongoose';
export declare enum UserRole {
    Volunteer = "volunteer",
    Staff = "staff",
    Admin = "admin"
}
export interface User extends BaseDocument {
    username: string;
    password: string;
    role: UserRole;
}
export declare const userSchema: Schema<any>;
