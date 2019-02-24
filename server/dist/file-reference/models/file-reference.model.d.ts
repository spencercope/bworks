import { BaseDocument } from "../../shared/base.model";
import { Schema } from "mongoose";
export interface FileReference extends BaseDocument {
    publicUrl: string;
    fileName: string;
    sizeBytes: number;
    note?: string;
    itemId?: string;
}
export declare const fileReferenceSchema: Schema<any>;
