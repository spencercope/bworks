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
    historyType?: HistoryType;
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
        enum: [
            'Donation Received',
            'Scrapped',
            'Donated',
            'Sold',
            'Earn A Bike Picked Up',
            'Earn A Bike Graduation',
            'Earn A PC',
            'In Progress'
        ]
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    person: String,
    note: String,
    historyType: {
        type: String,
        enum: ['Internal', 'External']
    }
}, {...schemaOptions, discriminatorKey: 'historyType'});

export const todoSchema = new Schema({
    isTransferred: {
        type: Boolean,
        default: false
    }
}, {discriminatorKey: 'historyType'});

export const storySchema = new Schema({
    transferredFromTodo: {
        type: Boolean,
        default: false
    }
}, {discriminatorKey: 'historyType'});
