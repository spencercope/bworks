import {BaseDocument, schemaOptions} from "../../shared/base.model";
import {Schema} from "mongoose";
import {Item} from "../../item/models/item.model";

export interface Donor extends BaseDocument {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    zip: number;
    phoneNumber?: string;
    donations?: Item[]; // TODO: wait for Item
    refSource?: string;
}

export const donorSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    refSource: String,
}, schemaOptions);

donorSchema.virtual('name').get(function () {
    return this.firstName + ' ' + this.lastName;
});

donorSchema.pre<Donor>("findOneAndUpdate", function (next) {
    this.updatedAt = new Date(Date.now());
    return next();
});
