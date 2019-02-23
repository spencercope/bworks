import {BaseDocument} from "../../shared/base.model";
import {Schema} from "mongoose";

export interface FileReference extends BaseDocument {
    publicUrl: string;
    fileName: string;
    sizeBytes: number;
    note?: string;
    itemId?: string;
}

export const fileReferenceSchema = new Schema({
    publicUrl: {
        type: String,
        required: true,
    },
    fileName: String,
    sizeBytes: Number,
    note: String,
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'FileReference'
    }
});
