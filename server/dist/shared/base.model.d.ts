import { Document, SchemaOptions } from 'mongoose';
export interface BaseDocument extends Document {
    createdAt?: Date;
    updatedAt?: Date;
    id?: string;
}
export declare const schemaOptions: SchemaOptions;
