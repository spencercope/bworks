import { BaseDocument } from "../../shared/base.model";
import { Schema } from "mongoose";
import { Item } from "../../item/models/item.model";
export interface Donor extends BaseDocument {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    zip: number;
    phoneNumber?: string;
    donations?: Item[];
    refSource?: string;
}
export declare const donorSchema: Schema<any>;
