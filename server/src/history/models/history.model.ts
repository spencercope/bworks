import {BaseDocument, schemaOptions} from "../../shared/base.model";
import {Status} from "../../item/models/item.model";
import {Schema} from "mongoose";

export enum HistoryType {
    Internal = 'Internal',
    External = 'External'
}

export interface History extends BaseDocument {
    status: Status;
    itemId?: string;
    person?: string;
    note?: string;
    type: HistoryType;
}

export interface Todo extends History {
    isTransferred: boolean;
}

export interface Story extends History {
    transferredFromTodo: boolean;
}

export const historySchema = new Schema({
    status: {
        type: String,
        enum: ['received', 'scraped', 'donated', 'sold', 'earn-bike', 'earn-pc', 'progress']
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    person: String,
    note: String,
    type: {
        type: String,
        enum: ['Internal', 'External']
    }
}, {...schemaOptions, discriminatorKey: 'type'});

export const todoSchema = new Schema({
    isTransferred: {
        type: Boolean,
        default: false
    }
}, {discriminatorKey: 'type'});

export const storySchema = new Schema({
    transferredFromTodo: {
        type: Boolean,
        default: false
    }
}, {discriminatorKey: 'type'});
