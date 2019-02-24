import { BaseDocument } from "../../shared/base.model";
import { Schema } from "mongoose";
export interface Donor extends BaseDocument {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    zip: number;
    phoneNumber?: string;
    donations?: any;
    refSource?: string;
}
export declare const donorSchema: Schema<any>;
