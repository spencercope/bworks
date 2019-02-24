import { BaseDocument } from './base.model';
export declare abstract class BaseVm<T extends BaseDocument> {
    protected constructor(model?: T);
    createdAt?: Date;
    updatedAt?: Date;
    id?: string;
    abstract getViewModel(model: T): void;
}
