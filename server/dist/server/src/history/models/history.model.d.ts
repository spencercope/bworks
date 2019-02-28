import { BaseDocument } from "../../shared/base.model";
import { Status } from "../../item/models/item.model";
import { Schema } from "mongoose";
export declare enum HistoryType {
    Internal = "Internal",
    External = "External"
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
export declare const historySchema: Schema<any>;
export declare const todoSchema: Schema<any>;
export declare const storySchema: Schema<any>;
