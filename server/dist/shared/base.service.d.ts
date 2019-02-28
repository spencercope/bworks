import { Model } from 'mongoose';
import { DeleteWriteOpResultObject } from 'mongodb';
import { BaseDocument } from './base.model';
export declare abstract class BaseService<T extends BaseDocument> {
    protected _model: Model<T>;
    createModel(doc?: Partial<T>): T;
    findAll(filter?: {}): Promise<T[]>;
    findOne(filter?: {}): Promise<T>;
    findById(id: string): Promise<T>;
    create(item: T): Promise<T>;
    delete(id: string): Promise<T>;
    update(id: string, item: T): Promise<T>;
    clearCollection(): Promise<DeleteWriteOpResultObject['result']>;
    counts(conditions?: {}): Promise<number>;
    private toObjectId;
}
